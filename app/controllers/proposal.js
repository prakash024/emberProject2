import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  posList: ENV.posList,
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  justVoted: false,
  isOpen: Ember.computed("model.state", function() {
    return (this.get("model.state") === "open");
  }),
  isMine: Ember.computed("model.user.id", "currentUser.id", function() {
    return (this.get("model.user.id") === this.get("currentUser.id"));
  }),
  canChange: Ember.computed("isOpen", "isMine", function() {
    return (this.get("isOpen") && this.get("isMine"));
  }),
  partialName: Ember.computed("model.type", function() {
    return "proposal/" + this.get("model.type").dasherize();
  }),
  actions: {
    startEdit() {
      this.set("isEditing", true);
    },
    submitEdit() {
      var _this = this;
      this.tracker.log("proposal", "edit");
      this.get("model").save().then(
        function() {
          _this.set("isEditing", false);
        },
        function() {}
      );
    },
    withdraw() {
      var _this = this;
      Ember.$.post(ENV.api + "/proposals/" + this.model.get("id") + "/withdraw",
      {}, function(data) {
        _this.store.pushPayload('proposal', data);
        _this.tracker.log("proposal", "withdraw");
      });
    },
    cancelEdit() {
      this.get("model").rollback();
      this.set("isEditing", false);
    },
  }
});
