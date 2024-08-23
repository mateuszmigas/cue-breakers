use std::{
    collections::HashMap,
    sync::atomic::{AtomicUsize, Ordering},
};

use serde::{Deserialize, Serialize};

pub trait Storage<T> {
    fn from_hashmap2(items: HashMap<usize, ItemWithId<T>>) -> Self;
    fn add(&mut self, item: T) -> ItemWithId<T>;
    fn list(&self) -> Vec<ItemWithId<T>>;
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ItemWithId<T> {
    pub id: usize,

    #[serde(flatten)]
    pub item: T,
}

impl<T> ItemWithId<T> {
    pub fn new(id: usize, item: T) -> ItemWithId<T> {
        ItemWithId::<T> { id, item }
    }
}

#[derive(Default)]
pub struct InMemoryStorage<T> {
    items: HashMap<usize, ItemWithId<T>>,
    id_generator: AtomicUsize,
}

impl<T> Storage<T> for InMemoryStorage<T>
where
    T: Clone,
{
    fn from_hashmap2(items: HashMap<usize, ItemWithId<T>>) -> Self {
        let id_generator = AtomicUsize::new(items.keys().max().unwrap_or(&0).clone());
        InMemoryStorage::<T> {
            items,
            id_generator,
        }
    }

    fn add(&mut self, item: T) -> ItemWithId<T> {
        let id = self.id_generator.fetch_add(1, Ordering::Relaxed);
        let new_item = ItemWithId::<T>::new(id, item);
        self.items.insert(id, new_item.clone());
        new_item
    }

    fn list(&self) -> Vec<ItemWithId<T>> {
        self.items.values().cloned().collect()
    }
}
