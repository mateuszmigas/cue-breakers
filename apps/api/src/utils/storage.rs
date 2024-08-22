use std::collections::HashMap;

pub trait Storage<T> {
    fn new() -> Self;
    fn add(&mut self, item: T) -> Result<(), String>;
    fn read(&self, id: u64) -> Option<T>;
    fn update(&mut self, id: u64, item: T) -> Result<(), String>;
    fn delete(&mut self, id: u64) -> Result<(), String>;
    fn list(&self) -> Vec<T>;
}

#[derive(Default)]
pub struct InMemoryStorage<T> {
    items: HashMap<u64, T>,
    next_id: u64,
}

impl<T> Storage<T> for InMemoryStorage<T>
where
    T: Clone,
{
    fn new() -> Self {
        InMemoryStorage {
            items: HashMap::new(),
            next_id: 1,
        }
    }

    fn add(&mut self, item: T) -> Result<(), String> {
        self.items.insert(self.next_id, item);
        self.next_id += 1;
        Ok(())
    }

    fn read(&self, id: u64) -> Option<T> {
        self.items.get(&id).cloned()
    }

    fn update(&mut self, id: u64, item: T) -> Result<(), String> {
        if self.items.contains_key(&id) {
            self.items.insert(id, item);
            Ok(())
        } else {
            Err("Item not found".to_string())
        }
    }

    fn delete(&mut self, id: u64) -> Result<(), String> {
        if self.items.contains_key(&id) {
            self.items.remove(&id);
            Ok(())
        } else {
            Err("Item not found".to_string())
        }
    }

    fn list(&self) -> Vec<T> {
        self.items.values().cloned().collect()
    }
}
