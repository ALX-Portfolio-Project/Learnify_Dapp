use ic_cdk::export::Principal;
use ic_cdk_macros::{query, update};
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Mutex;

type UserId = Principal;
type Role = String;

#[derive(Serialize, Deserialize, Clone, Debug)]
struct SavingsGoal {
    description: String,
    target_amount: u64,
    current_amount: u64,
}

lazy_static! {
    static ref AUTH_SERVICE: Mutex<HashMap<UserId, Role>> = Mutex::new(HashMap::new());
    static ref SAVINGS_DATA: Mutex<HashMap<UserId, Vec<SavingsGoal>>> = Mutex::new(HashMap::new());
}

// ---------- Authentication and Authorization (Milestone 1) ----------
#[update]
fn register_user(role: Role) -> Result<String, String> {
    let caller = ic_cdk::caller();
    let mut auth_service = AUTH_SERVICE.lock().unwrap();

    if auth_service.contains_key(&caller) {
        Err("User already registered.".to_string())
    } else {
        auth_service.insert(caller, role);
        Ok("User registered successfully.".to_string())
    }
}

#[query]
fn get_user_role() -> Result<Role, String> {
    let caller = ic_cdk::caller();
    let auth_service = AUTH_SERVICE.lock().unwrap();

    if let Some(role) = auth_service.get(&caller) {
        Ok(role.clone())
    } else {
        Err("User not found.".to_string())
    }
}

#[update]
fn restricted_action() -> Result<String, String> {
    let caller = ic_cdk::caller();
    let auth_service = AUTH_SERVICE.lock().unwrap();

    match auth_service.get(&caller) {
        Some(role) if role == "admin" => Ok("Restricted action executed!".to_string()),
        Some(_) => Err("Access denied: Insufficient permissions.".to_string()),
        None => Err("Access denied: User not registered.".to_string()),
    }
}

#[query]
fn is_user_registered() -> bool {
    let caller = ic_cdk::caller();
    let auth_service = AUTH_SERVICE.lock().unwrap();

    auth_service.contains_key(&caller)
}

// ---------- Savings and Goals Management (Milestone 2) ----------
#[update]
fn set_savings_goal(description: String, target_amount: u64) -> String {
    let caller = ic_cdk::caller();
    let mut savings_data = SAVINGS_DATA.lock().unwrap();

    let goal = SavingsGoal {
        description,
        target_amount,
        current_amount: 0,
    };

    savings_data
        .entry(caller)
        .or_insert_with(Vec::new)
        .push(goal);

    "Savings goal added successfully!".to_string()
}

#[update]
fn update_savings_progress(index: usize, amount: u64) -> Result<String, String> {
    let caller = ic_cdk::caller();
    let mut savings_data = SAVINGS_DATA.lock().unwrap();

    if let Some(goals) = savings_data.get_mut(&caller) {
        if let Some(goal) = goals.get_mut(index) {
            goal.current_amount += amount;

            if goal.current_amount >= goal.target_amount {
                return Ok(format!(
                    "🎉 Congratulations! You've reached your savings goal: {}",
                    goal.description
                ));
            }

            Ok(format!(
                "Progress updated: {} out of {} saved for '{}'.",
                goal.current_amount, goal.target_amount, goal.description
            ))
        } else {
            Err("Invalid goal index.".to_string())
        }
    } else {
        Err("No savings goals found for this user.".to_string())
    }
}

#[query]
fn get_savings_goals() -> Vec<SavingsGoal> {
    let caller = ic_cdk::caller();
    let savings_data = SAVINGS_DATA.lock().unwrap();

    savings_data.get(&caller).cloned().unwrap_or_else(Vec::new)
}
// ---------- Staking Simulator ----------
#[update]
fn simulate_stake(amount: u64, reward_rate: f64) -> Result<String, String> {
    let caller = ic_cdk::caller();
    let mut staking = STAKING.lock().unwrap();

    if staking.contains_key(&caller) {
        return Err("An active staking session already exists.".to_string());
    }

    let start_time = ic_cdk::api::time() / 1_000_000_000; // Convert nanoseconds to seconds
    staking.insert(
        caller,
        StakingInfo {
            amount,
            start_time,
            reward_rate,
        },
    );

    Ok("Staking simulation started.".to_string())
}

#[query]
fn get_staking_summary() -> Result<String, String> {
    let caller = ic_cdk::caller();
    let staking = STAKING.lock().unwrap();

    if let Some(info) = staking.get(&caller) {
        let current_time = ic_cdk::api::time() / 1_000_000_000; // Convert to seconds
        let elapsed_time = current_time - info.start_time;
        let reward = (info.amount as f64 * info.reward_rate * elapsed_time as f64).round();

        return Ok(format!(
            "Staked: {}, Reward: {:.2}",
            info.amount, reward
        ));
    }
    Err("No active staking session.".to_string())
}
// ---------- Wallet Integration ----------
#[update]
fn create_wallet() -> String {
    let caller = ic_cdk::caller();
    let mut wallets = WALLETS.lock().unwrap();

    if wallets.contains_key(&caller) {
        return "Wallet already exists.".to_string();
    }

    wallets.insert(caller, Wallet { tokens: 0 });
    "Wallet created successfully!".to_string()
}

#[query]
fn get_wallet_balance() -> Result<u64, String> {
    let caller = ic_cdk::caller();
    let wallets = WALLETS.lock().unwrap();

    wallets
        .get(&caller)
        .map(|wallet| wallet.tokens)
        .ok_or_else(|| "Wallet not found.".to_string())
}