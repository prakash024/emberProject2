import Ember from "ember";

export default Ember.Component.extend({
  sortedActivities: Ember.computed("notifications.[]", function() {
    return this.get("notifications").sortBy("createdAt").reverse().mapBy('activity');
  })
});
