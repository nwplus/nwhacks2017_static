Polymer({is:"register-form",properties:{valid:{type:Boolean,value:function(){return!0}},githubURL:{computed:"updateGithubURL(data.github)"},citiesURL:{computed:"updateCitiesURL(data.city, cityFocused)"},citiesClean:{computed:"cleanCities(cities)"},data:{type:Object,notify:!0,value:function(){return{travel_reimbursement:!1,first_hackathon:!1,mentor:!1}}},alreadyRegistered:{value:!1}},observers:["checkEmail(data.email)"],checkEmail:function(e){if(console.log("email",e),this.checkEmailTimeout&&(clearTimeout(this.checkEmailTimeout),this.checkEmailTimeout=!1),e){var t=this;this.checkEmailTimeout=setTimeout(function(){t.checkEmailTimeout=!1,firebase.database().ref("emails").child(btoa(t.data.email)).once("value").then(function(e){var i=e.val();t.alreadyRegistered=!!i})},200)}},attached:function(){var e=this;setTimeout(function(){e.$.form.validate()},1)},updateGithubURL:function(e){return e?"https://api.github.com/users/"+e:""},updateCitiesURL:function(e,t){return e&&t?"https://api.teleport.org/api/cities/?limit=5&search="+e:""},cleanCities:function(e){return e&&e._embedded["city:search-results"]},selectCity:function(e){this.set("data.city",e.model.item.matching_full_name)},cleanFileName:function(e){return e.replace(/[^A-Za-z0-9\.\-\(\)]+/g,"-")},submit:function(){var e=this;if(this.valid=this.$.form.validate(),this.valid){this.$.submitting.open();const t=firebase.database().ref("ids").push().key,i=this.$.resume.inputElement.files;var a=Promise.resolve();if(i.length>0){const s=i[0],n=this.cleanFileName(s.name),r="resumes/"+t+"-"+n;this.data.resume=r,a=firebase.storage().ref(r).put(s)}a.then(function(){return firebase.database().ref("registrations").child(t).set(e.data)}).then(function(){return firebase.database().ref("emails").child(btoa(e.data.email)).set(!0)}).then(function(t){console.log("Registered",t),e.$.submitting.close(),e.$.registered.open()}).catch(function(t){console.log("Error!",t),e.error=t,e.$.submitting.close(),e.$.error.open()})}}});var config={apiKey:"AIzaSyBou6z9QA7zvCpxUFLoTbwQZcWuBn47yEA",authDomain:"nwhacks-96701.firebaseapp.com",databaseURL:"https://nwhacks-96701.firebaseio.com",storageBucket:"nwhacks-96701.appspot.com",messagingSenderId:"874137730051"};firebase.initializeApp(config);