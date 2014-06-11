function NewEducation(school, major, degree, start, end) {
	var self = this;
    self.school = ko.observable(school).extend({ required: true });
    self.major = ko.observable(major).extend({ required: true });
    self.degree = ko.observable(degree).extend({ required: true });
    self.start = ko.observable(start).extend({ required: true });
    self.end = ko.observable(end);
    
    self.errors = ko.validation.group(self); 
}

DXSK8.Store.Education = function() {
	var isPhone = DevExpress.devices.current().screenSize === "small";

	var educations = ko.observableArray([
        	new NewEducation("", "", "", "", "")
	    ]);

	var viewModel = {	
	
		isPhone: isPhone,

        showLookup: function (e) {
            if(isPhone)
                return;
            $(".dx-viewport .dx-lookup-popup-wrapper:visible").addClass(e.element.closest(".billing").length ? "billing-popup" : "shipping-popup");
        },

        viewShown: function() {
            if(isPhone)
                $(".dx-viewport .profile").dxScrollView();
            else
                $(".dx-viewport .profile-address-info").dxScrollView();
        },

		educations : educations,
		
		degrees : [{Id: 1, Name: "小学"}, {Id: 2, Name: "大学"}],
		 
	    add : function() {
	        educations.push(new NewEducation("", "", "", "", ""));
	    },
	
		remove : function(education) { educations.remove(education) },
		
		save : function() { 
		 	var errorExists = false;

			for(var i = 0; i < educations().length; i++)
			{
				if (educations()[i].errors().length > 0)
				{
					educations()[i].errors.showAllMessages();
					errorExists = true;
				}
			}				
			
			if (errorExists)
			{
				alert("error" + educations()[0].errors().length); //returning the control providing user a chance to correct the issues
			}
			else
			{
				alert("ok");
				}
		}
    };
    
	return viewModel;
};


