import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import { createRoot, createEffect, createSignal } from "solid-js";

const [getCount, setCount] = createSignal(0);

setInterval(() => {
  setCount(getCount() + 1);
}, 1000);

createRoot(() => {
  createEffect(() => {
    console.log(getCount());
  });
});

import "./main.html";

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  "click button"(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
