use ic_cdk::export::Principal;
use ic_cdk_macros::{query, update};
use lazy_static::lazy_static; 
use std::collections::HashMap;
use std::sync::Mutex;

type UserId = Principal;
type Role = String;

lazy_static! {
    static ref AUTH_SERVICE: Mutex<HashMap<UserId, Role>> = Mutex::new(HashMap::new());
}

// Register a user with a specific role
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

// Get the role of the calling user
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

// Perform a restricted action based on user role
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

// Check if the calling user is registered
#[query]
fn is_user_registered() -> bool {
    let caller = ic_cdk::caller();
    let auth_service = AUTH_SERVICE.lock().unwrap();

    auth_service.contains_key(&caller)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_register_user() {
        let caller = Principal::anonymous();
        ic_cdk::api::set_caller(caller);

        let result = register_user("learner".to_string());
        assert_eq!(result.unwrap(), "User registered successfully.");

        let auth_service = AUTH_SERVICE.lock().unwrap();
        assert_eq!(auth_service.get(&caller).unwrap(), "learner");
    }

    #[test]
    fn test_get_user_role() {
        let caller = Principal::anonymous();
        ic_cdk::api::set_caller(caller);

        register_user("mentor".to_string()).unwrap();
        let role = get_user_role().unwrap();
        assert_eq!(role, "mentor");
    }

    #[test]
    fn test_restricted_action() {
        let caller = Principal::anonymous();
        ic_cdk::api::set_caller(caller);

        register_user("admin".to_string()).unwrap();
        let result = restricted_action().unwrap();
        assert_eq!(result, "Restricted action executed!");
    }

    #[test]
    fn test_is_user_registered() {
        let caller = Principal::anonymous();
        ic_cdk::api::set_caller(caller);

        register_user("learner".to_string()).unwrap();
        let is_registered = is_user_registered();
        assert!(is_registered);
    }
}
