DXSK8.Store.Profile = function (params) {
    var isPhone = DevExpress.devices.current().screenSize === "small";

    var defaultData = {
        Id: null,
        Name: null,
        ClientName: null,
        Mobile: null,
        CityName: null,
        EmployeeOBStatus: null,
        EnglishName: null,
        Sex: null,
        DocumentType: null,
        DocumentNumber: null,
        Birthday: null,
        Marriage: null,
        Nation: null,
        Yhy: null,
        Ysy: null,
        FixPhone: null,
        Email: null,
        Degree: null,
        HukouType: null,
        HujiAddress: null,
        HujiZipCode: null,
        Address: null,
        Phone: null,
        ZipCode: null,
        EmergencyContactPerson: null,
        EmergencyContactPhone: null,
        EverPension: null,
        EverAccumulation: null,
        EnterDate: null,
        //EmployeeOBStatusOption: null,
        SexOption: null,
        DocumentTypeOption: null,
        MarriageOption: null,
        DegreeOption: null
    };

    var viewModel = ko.mapping.fromJS(defaultData);

    function mapServerData(serverData) {
        ko.mapping.fromJS(serverData, viewModel);
    }

    function loadData() {
        $.getJSON("/api/EmployeeWeb/" + curEmployeeId, function (data) {
            mapServerData(data);
        });
    }

    viewModel.isPhone = isPhone;
    viewModel.showLookup = function (e) {
        if (viewModel.isPhone)
            return;
        $(".dx-viewport .dx-lookup-popup-wrapper:visible").addClass(e.element.closest(".billing").length ? "billing-popup" : "shipping-popup");
    };

    viewModel.viewShown = function () {
        loadData();
        if (isPhone)
            $(".dx-viewport .profile").dxScrollView();
        else
            $(".dx-viewport .profile-address-info").dxScrollView();
    };

    viewModel.errors = ko.validation.group(viewModel);

    viewModel.save = function () {

        if (viewModel.errors().length > 0) {

            viewModel.errors.showAllMessages();

            alert("error" + educations()[0].errors().length); //returning the control providing user a chance to correct the issues
        }
        else {
            alert("ok");
        }
    }

    return viewModel;
};