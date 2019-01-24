App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",
  isLogin: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Authentication.json", function(person) {
      App.contracts.Person = TruffleContract(person);
      App.contracts.Person.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render: function() {
    var personInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        console.log("Acc=" + account);
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    App.contracts.Person.deployed().then(function(instance) {
        return instance.id();
      }).then(function(id){
        loader.hide();
        content.show();
        var loginSession = $("#loginSession");
        var signUpSession = $("#signUpSession");
        console.log('id='+id);
        signUpSession.show();
        if(id > 0) loginSession.show()
        else loginSession.show();       
      })
  },
  signUp: function() {
    var name = $("#name").val();
    var pwd = $("#password").val();
    var addr = $("#addr").val();
    var phone = $("#phone").val();
    var loginSession = $("#loginSession");
    var signUpSession = $("#signUpSession");
    App.contracts.Person.deployed()
      .then(function(instance) {
        console.log("signup");
        instance.signup(name,pwd,addr,phone);
      })
      .then(function(result) {
        loginSession.show();
        
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  login: function() {
    var name = $("#name_login").val();
    var pass = $("#pass_login").val();
    var personInstance;
    // Load contract data
    App.contracts.Person.deployed().then(function(instance) {
        personInstance = instance;
        return instance.id();
      })
      .then(function(id) {
        var dataset = $("#dataset");
        
        dataset.empty();
        for (var i = 1; i <= id; i++) {
          personInstance.users(i).then(function(person) {
            //todo
            console.log("name="+person);
            var personStr = person+"";
            var info = personStr.split(',');
            var utfName = web3.toUtf8(info[0])+"";
            var utfPass = web3.toUtf8(info[1])+"";
            if(name == utfName && pass == utfPass){//login success
              console.log("Login Success");
              $("#personalInfo").show();
              var newRow = "<tr><td>" + web3.toUtf8(info[0]) + "</td><td>" +
              web3.toUtf8(info[2]) + "</td><td>" +
              info[3] + "</td></tr>";
              dataset.append(newRow);              
            }
          });
        }
      })
      .catch(function(error) {
        console.warn(error);
      });
  },logout: function() {
      $("#personalInfo").hide();
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
