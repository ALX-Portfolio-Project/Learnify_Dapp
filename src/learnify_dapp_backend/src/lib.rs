use ic_cdk::export::Principal;
use ic_cdk_macros::{query, update};
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Mutex;

// ---------- Data Structures ----------
type UserId = Principal;

#[derive(Serialize, Deserialize, Clone, Debug)]
struct Wallet {
    tokens: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct SavingsGoal {
    description: String,
    target_amount: u64,
    current_amount: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct StakingInfo {
    amount: u64,
    start_time: u64,
    reward_rate: f64,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct Badge {
    name: String,
    description: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct LeaderboardEntry {
    user_id: UserId,
    score: u64,
}

// ---------- Global Storage ----------
lazy_static! {
    static ref USERS: Mutex<HashMap<UserId, String>> = Mutex::new(HashMap::new());
    static ref WALLETS: Mutex<HashMap<UserId, Wallet>> = Mutex::new(HashMap::new());
    static ref SAVINGS: Mutex<HashMap<UserId, Vec<SavingsGoal>>> = Mutex::new(HashMap::new());
    static ref STAKING: Mutex<HashMap<UserId, StakingInfo>> = Mutex::new(HashMap::new());
    static ref BADGES: Mutex<HashMap<UserId, Vec<Badge>>> = Mutex::new(HashMap::new());
    static ref LEADERBOARD: Mutex<Vec<LeaderboardEntry>> = Mutex::new(Vec::new());
}

// ---------- Authentication and Authorization ----------
#[update]
fn register_user(role: String) -> Result<String, String> {
    let caller = ic_cdk::caller();
    let mut users = USERS.lock().unwrap();

    if users.contains_key(&caller) {
        Err("User already registered.".to_string())
    } else {
        users.insert(caller, role);
        Ok("User registered successfully.".to_string())
    }
}

#[query]
fn get_user_role() -> Result<String, String> {
    let caller = ic_cdk::caller();
    let users = USERS.lock().unwrap();

    users
        .get(&caller)
        .cloned()
        .ok_or_else(|| "User not found.".to_string())
}

// ---------- Savings Goals Management ----------
#[update]
fn set_savings_goal(description: String, target_amount: u64) -> String {
    let caller = ic_cdk::caller();
    let mut savings = SAVINGS.lock().unwrap();

    let goal = SavingsGoal {
        description,
        target_amount,
        current_amount: 0,
    };

    savings.entry(caller).or_insert_with(Vec::new).push(goal);
    "Savings goal added successfully!".to_string()
}

#[update]
fn update_savings_progress(index: usize, amount: u64) -> Result<String, String> {
    let caller = ic_cdk::caller();
    let mut savings = SAVINGS.lock().unwrap();

    if let Some(goals) = savings.get_mut(&caller) {
        if let Some(goal) = goals.get_mut(index) {
            goal.current_amount += amount;
            if goal.current_amount >= goal.target_amount {
                return Ok(format!(
                    "🎉 Goal achieved: {}!",
                    goal.description
                ));
            }
            return Ok(format!(
                "Progress updated: {}/{} for '{}'.",
                goal.current_amount, goal.target_amount, goal.description
            ));
        }
    }
    Err("Invalid goal or user.".to_string())
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

// ---------- Gamification ----------
#[update]
fn award_badge(name: String, description: String) -> String {
    let caller = ic_cdk::caller();
    let mut badges = BADGES.lock().unwrap();

    badges
        .entry(caller)
        .or_insert_with(Vec::new)
        .push(Badge { name, description });

    "Badge awarded!".to_string()
}

#[query]
fn get_badges() -> Vec<Badge> {
    let caller = ic_cdk::caller();
    let badges = BADGES.lock().unwrap();

    badges.get(&caller).cloned().unwrap_or_else(Vec::new)
}

#[update]
fn update_leaderboard(score: u64) -> String {
    let caller = ic_cdk::caller();
    let mut leaderboard = LEADERBOARD.lock().unwrap();

    if let Some(entry) = leaderboard.iter_mut().find(|e| e.user_id == caller) {
        entry.score += score;
    } else {
        leaderboard.push(LeaderboardEntry {
            user_id: caller,
            score,
        });
    }

    "Leaderboard updated!".to_string()
}

#[query]
fn get_leaderboard() -> Vec<LeaderboardEntry> {
    let leaderboard = LEADERBOARD.lock().unwrap();
    leaderboard.clone()
}
