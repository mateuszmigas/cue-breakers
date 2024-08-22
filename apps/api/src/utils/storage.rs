use std::{
    collections::HashMap,
    sync::atomic::{AtomicUsize, Ordering},
};

use serde::{Deserialize, Serialize};

pub trait Storage<T> {
    fn new() -> Self;
    fn add(&mut self, item: T) -> IdentifyableItem<T>;
    fn read(&self, id: u64) -> Option<T>;
    fn update(&mut self, id: u64, item: T) -> Result<(), String>;
    fn delete(&mut self, id: u64) -> Result<(), String>;
    fn list(&self) -> Vec<T>;
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct IdentifyableItem<T> {
    pub id: usize,

    #[serde(flatten)]
    pub item: T,
}

impl<T> IdentifyableItem<T> {
    pub fn new(id: usize, item: T) -> IdentifyableItem<T> {
        IdentifyableItem::<T> { id, item }
    }
}

#[derive(Default)]
pub struct InMemoryStorage<T> {
    items: HashMap<usize, IdentifyableItem<T>>,
    id_generator: AtomicUsize,
}

impl<T> Storage<T> for InMemoryStorage<T>
where
    T: Clone,
{
    fn new() -> Self {
        let id_generator = AtomicUsize::new(0);
        InMemoryStorage {
            items: HashMap::new(),
            id_generator,
        }
    }

    fn add(&mut self, item: T) -> IdentifyableItem<T> {
        let id = self.id_generator.fetch_add(1, Ordering::Relaxed);
        let new_item = IdentifyableItem::<T>::new(id, item);
        self.items.insert(id, new_item.clone());
        new_item
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
