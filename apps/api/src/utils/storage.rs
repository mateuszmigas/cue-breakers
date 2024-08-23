use std::{
    collections::HashMap,
    sync::atomic::{AtomicUsize, Ordering},
};

use serde::{Deserialize, Serialize};

pub trait Storage<T> {
    fn from_items(items: &[T]) -> Self;
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
    items: HashMap<usize, T>,
    id_generator: AtomicUsize,
}

impl<T> Storage<T> for InMemoryStorage<T>
where
    T: Clone,
{
    fn from_items(items: &[T]) -> Self {
        let id_generator = AtomicUsize::new(0);
        let items_map: HashMap<usize, _> = items
            .iter()
            .map(|item| (id_generator.fetch_add(1, Ordering::Relaxed), item.clone()))
            .collect();

        InMemoryStorage::<T> {
            items: items_map,
            id_generator,
        }
    }

    fn add(&mut self, item: T) -> ItemWithId<T> {
        let id = self.id_generator.fetch_add(1, Ordering::Relaxed);
        self.items.insert(id, item.clone());
        ItemWithId::new(id, item)
    }

    fn list(&self) -> Vec<ItemWithId<T>> {
        self.items
            .iter()
            .map(|(&id, item)| ItemWithId::new(id, item.clone()))
            .collect()
    }
}
