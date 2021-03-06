import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import { createRoot, createEffect, createSignal } from "solid-js";

import html from "solid-js/html";
import { For } from "solid-js/web";

const [getCount, setCount] = createSignal(0);

setInterval(() => {
  setCount(getCount() + 1);
}, 1000);

createRoot(() => {
  createEffect(() => {
    console.log(getCount());
  });

  const div = html`
    <div>
      <${For} each=${() => [0, 1, 2]}>
        ${(n) => html` <span>The count is: ${getCount}</span> `}
      <//>
    </div>
  `;

  document.body.appendChild(div);
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
