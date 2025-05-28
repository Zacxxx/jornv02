export class Subject {
  value: any;
  subscribers = new Set();

  current() {
    return this.value;
  }
  next(new_value: any) {
    this.value = new_value;
    this.subscribers.forEach((cb: any) => cb(this.value));
  }
  subscribe(callback: any) {
    this.subscribers.add(callback);

    const unsubscribe = () => {
      this.subscribers.delete(callback);
    };

    return { unsubscribe };
  }
}

export class BehaviourSubject<T> {
  value: T;
  subscribers = new Set<(value: T, prev?: T) => void>();

  constructor(initial_value: T) {
    this.value = initial_value;
  }

  current(): T {
    return this.value;
  }
  
  next(new_value: T) {
    const prev = this.value;
    this.value = new_value;
    this.subscribers.forEach((cb) => cb(this.value, prev));
  }
  
  subscribe(callback: (value: T, prev?: T) => void) {
    this.subscribers.add(callback);
    callback(this.value);
    const unsubscribe = () => {
      this.subscribers.delete(callback);
    };

    return { unsubscribe };
  }
}
