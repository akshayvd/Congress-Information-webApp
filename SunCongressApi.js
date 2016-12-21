var app = angular.module('congress', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);
app.controller('parentController', function($scope, $http) {
    $scope.isLegislatorsMenu = true;
    $scope.isBillsMenu = false;
    $scope.isCommitteesMenu = false;
    $scope.isFavoritesMenu = false;
    $scope.menuTxt = "Legislators";
    $scope.showMenu = true;
    $scope.prevPadding = "";
    $scope.favLegislators = [];
    $scope.favBills = [];
    $scope.favCommittees = [];
    $scope.FavTabTitleTxt = "Legislators";
    $scope.isLegislatorsFavTab = true;
    $scope.isBillsFavTab = false;
    $scope.isCommitteesFavTab = false;
    $scope.committees = [];
    $scope.ToggleClicked = function(showMenu) {
        if (showMenu) {
            $('#fpSbWd').removeClass('sidebarSyle2').addClass('sidebarSyle');
            $('#fpfdWd').removeClass('warpperDiv2').addClass('warpperDiv');
            $('#fpSbUl').removeClass('sideList2').addClass('sideList');
        } else {
            $('#fpSbWd').removeClass('sidebarSyle').addClass('sidebarSyle2');
            $('#fpfdWd').removeClass('warpperDiv').addClass('warpperDiv2');
            $('#fpSbUl').removeClass('sideList').addClass('sideList2');
        }
    }
    $scope.getPartyImageURL = function (item) {
        return item.party=="R"?"http://cs-server.usc.edu:45678/hw/hw8/images/r.png":item.party=="D"?"http://cs-server.usc.edu:45678/hw/hw8/images/d.png":"http://independentamericanparty.org/wp-content/themes/v/images/logo-american-heritage-academy.png";
    }
    $scope.getPartyName = function (item) {
        return item.party=="R"?"Republican":item.party=="D"?"Democrat":"Independent"
    }
    $scope.getChamberImageURL = function(item){
        return item.chamber=="senate"?"http://cs-server.usc.edu:45678/hw/hw8/images/s.svg":"http://cs-server.usc.edu:45678/hw/hw8/images/h.png"
    }
    $scope.MenuClick = function(menu) {
        switch (menu) {
            case "legi":
                $scope.isLegislatorsMenu = true;
                $scope.isBillsMenu = false;
                $scope.isCommitteesMenu = false;
                $scope.isFavoritesMenu = false;
                $scope.menuTxt = "Legislators";
                break;
            case "bill":
                $scope.isLegislatorsMenu = false;
                $scope.isBillsMenu = true;
                $scope.isCommitteesMenu = false;
                $scope.isFavoritesMenu = false;
                $scope.menuTxt = "Bills";
                break;
            case "comm":
                $scope.isLegislatorsMenu = false;
                $scope.isBillsMenu = false;
                $scope.isCommitteesMenu = true;
                $scope.isFavoritesMenu = false;
                $scope.menuTxt = "Committees";
                break;
            case "favo":
                $scope.isLegislatorsMenu = false;
                $scope.isBillsMenu = false;
                $scope.isCommitteesMenu = false;
                $scope.isFavoritesMenu = true;
                $scope.menuTxt = "Favorites";
                var object = JSON.parse(localStorage.getItem("L"));
                object = object == null ? [] : object;
                $scope.favLegislators = object;
                var object = JSON.parse(localStorage.getItem("B"));
                object = object == null ? [] : object;
                $scope.favBills = object;
                var object = JSON.parse(localStorage.getItem("C"));
                object = object == null ? [] : object;
                $scope.favCommittees = object;
                break;
        }
    };
    $scope.FavTabChange = function(tab) {
        $scope.FavTabTitleTxt = tab;
        switch (tab) {
            case "Legislators":
                $scope.isLegislatorsFavTab = true;
                $scope.isBillsFavTab = false;
                $scope.isCommitteesFavTab = false;
                $("#faLe").removeClass("active").addClass("active");
                $("#faBi").removeClass("active");
                $("#faCo").removeClass("active");
                break;
            case "Bills":
                $scope.isLegislatorsFavTab = false;
                $scope.isBillsFavTab = true;
                $scope.isCommitteesFavTab = false;
                $("#faLe").removeClass("active");
                $("#faBi").removeClass("active").addClass("active");
                $("#faCo").removeClass("active");
                break;
            case "Committees":
                $scope.isLegislatorsFavTab = false;
                $scope.isBillsFavTab = false;
                $scope.isCommitteesFavTab = true;
                $("#faLe").removeClass("active");
                $("#faBi").removeClass("active");
                $("#faCo").removeClass("active").addClass("active");
                break;
        }
    };
    $scope.deleteFavItem = function(type, item) {
            var object = JSON.parse(localStorage.getItem(type));
            object = object == null ? [] : object;
            switch (type) {
                case "L":
                    for (var k = 0; k < object.length - 1; k++) {
                        if (object[k].bioguide_id == item.bioguide_id) {
                            for (var l = k; l < object.length - 1; l++) {
                                object[l] = object[l + 1];
                            }
                            break;
                        }
                    }
                    object = object.slice(0, object.length - 1);
                    localStorage.setItem("L", JSON.stringify(object));
                    $scope.favLegislators = object;
                    $scope.selectedLegislator.isMarkedFav = false;
                    break;
                case "B":
                    for (var k = 0; k < object.length - 1; k++) {
                        if (object[k].bill_id == item.bill_id) {
                            for (var l = k; l < object.length - 1; l++) {
                                object[l] = object[l + 1];
                            }
                            break;
                        }
                    }
                    object = object.slice(0, object.length - 1);
                    localStorage.setItem("B", JSON.stringify(object));
                    $scope.favBills = object;
                    $scope.selectedBill.isMarkedFav = false;
                    break;
                case "C":
                    for (var k = 0; k < object.length - 1; k++) {
                        if (object[k].committee_id == item.committee_id) {
                            for (var l = k; l < object.length - 1; l++) {
                                object[l] = object[l + 1];
                            }
                            break;
                        }
                    }
                    object = object.slice(0, object.length - 1);
                    localStorage.setItem("C", JSON.stringify(object));
                    $scope.favCommittees = object;
                    for (var i = 0; i < $scope.committees.length; i++) {
                        if ($scope.committees[i].committee_id == item.committee_id) {
                            $scope.committees[i].isMarkedFav = false;
                            break;
                        }
                    }
                    break;
            }
    };
    $scope.favViewDetails = function(type, item){
    	switch(type){
    		case "L":
    			item.isMarkedFav = true;
    			$scope.selectedLegislator = item;
    			setTimeout(function(){
    				$("#legiMenuLink").click();
    				$('#carousel-legislators').carousel(1);
    			}, 300);
    			break;
    		case "B":
    			item.isMarkedFav = true;
    			$scope.selectedBill = item;
    			setTimeout(function(){
    				$("#billMenuLink").click();
    				$('#carousel-bills').carousel(1);
    			}, 300);
    			break;
    	}
    };
        ////////////////////////////////////////////////////////////////////////////////
    $scope.currentPageComm = 1;
    $scope.chamberFilterComm = 'house';
    $scope.CommTabTitleTxt = 'House';
    $scope.isCommJointTab = false;
    $scope.isCommHouseTab = true;
    $scope.isCommSenateTab = false;
    $scope.orderCriteriaCommittees = ['committee_id'];
    $http.get('index.php/?database=committees&per_page=all').success(function(response){
    //$http.get('comm.json').success(function(response) {
        $scope.committees = response.results;
        var object = JSON.parse(localStorage.getItem("C"));
        object = object == null ? [] : object;
        $scope.favCommittees = object;
        for (var i = 0; i < $scope.committees.length; i++) {
            $scope.committees[i].isMarkedFav = false;
            for (var j = 0; j < object.length; j++) {
                if ($scope.committees[i].committee_id == object[j].committee_id) {
                    $scope.committees[i].isMarkedFav = true;
                    break;
                }
            }
        }
    });
    $scope.CommTabChange = function(tab) {
        $('#seBoCo').val('');
        $scope.searchComm = "";
        switch (tab) {
            case "house":
                $scope.chamberFilterComm = 'house';
                $scope.CommTabTitleTxt = 'House';
                $scope.isCommHouseTab = true;
                $scope.isCommSenateTab = false;
                $scope.isCommJointTab = false;
                $("#coHo").removeClass("active").addClass("active");
                $("#coSe").removeClass("active");
                $("#coJo").removeClass("active");
                break;
            case "senate":
                $scope.chamberFilterComm = 'senate';
                $scope.CommTabTitleTxt = 'Senate';
                $scope.isCommHouseTab = false;
                $scope.isCommSenateTab = true;
                $scope.isCommJointTab = false;
                $("#coHo").removeClass("active");
                $("#coSe").removeClass("active").addClass("active");
                $("#coJo").removeClass("active");
                break;
            case "joint":
                $scope.chamberFilterComm = 'joint';
                $scope.CommTabTitleTxt = 'Joint';
                $scope.isCommHouseTab = false;
                $scope.isCommSenateTab = false;
                $scope.isCommJointTab = true;
                $("#coHo").removeClass("active");
                $("#coSe").removeClass("active");
                $("#coJo").removeClass("active").addClass("active");
                break;
        }
    };
    $scope.CommFavBtnClick = function(data) {
        if (data.isMarkedFav) {
            var object = JSON.parse(localStorage.getItem("C"));
            object = object == null ? [] : object;
            for (var k = 0; k < object.length - 1; k++) {
                if (object[k].committee_id == data.committee_id) {
                    for (var l = k; l < object.length - 1; l++) {
                        object[k] = object[k + 1];
                    }
                    break;
                }
            }
            object = object.slice(0, object.length - 1);
            localStorage.setItem("C", JSON.stringify(object));
            $scope.favCommittees = object;
        } else {
            favBtnClick('C', data);
            var object = JSON.parse(localStorage.getItem("C"));
            object = object == null ? [] : object;
            $scope.favCommittees = object;
        }
        for (var i = 0; i < $scope.committees.length; i++) {
            if ($scope.committees[i].committee_id == data.committee_id) {
                $scope.committees[i].isMarkedFav = !data.isMarkedFav;
                break;
            }
        }
    };
    /////////////////////////////////////////////////////////////////////
    $scope.legislators = [];
    $scope.legislatorTopBills = [];
    $scope.legislatorTopCommittees = [];
    $scope.currentPageLegis = 1;
    $scope.isStateTab = true;
    $scope.isHouseTab = false;
    $scope.isSenateTab = false;
    $scope.termPercent = 0;
    $scope.formatedTS = "";
    $scope.formatedTE = "";
    $scope.formatedBD = "";
    $scope.LegislatorSocialLinks = "";
    $scope.orderCriteriaLegis = ['state', 'last_name'];
    $scope.chamberFilterLegis = '';
    $scope.LegisTabTitleTxt = 'State';
    $scope.LegisBackClick = function() {
        $('#carousel-legislators').carousel(0);
    };
    $scope.LegislatorsDetails = function(legislator) {
        $scope.selectedLegislator = legislator;
        $('#carousel-legislators').carousel(1);
        $http.get('index.php/?database=bills&sponsor_id=' + legislator.bioguide_id).success(function(response) {
            $scope.legislatorTopBills = response.results;
        });
        $http.get('index.php/?database=committees&member_ids=' + legislator.bioguide_id).success(function(response) {
            $scope.legislatorTopCommittees = response.results;
        });
        $scope.LegislatorSocialLinks = "";
        if (legislator.twitter_id != null && legislator.twitter_id != "")
            $scope.LegislatorSocialLinks += " <a target='_blank' href='https://twitter.com/" + legislator.twitter_id + "'><img width='30' height='30' src='http://cs-server.usc.edu:45678/hw/hw8/images/t.png'/></a>";
        if (legislator.facebook_id != null && legislator.facebook_id != "")
            $scope.LegislatorSocialLinks += " <a target='_blank' href='https://facebook.com/" + legislator.facebook_id + "'><img width='30' height='30' src='http://cs-server.usc.edu:45678/hw/hw8/images/f.png'/></a>";
        if (legislator.twitter_id != null && legislator.twitter_id != "")
            $scope.LegislatorSocialLinks += " <a target='_blank' href='" + legislator.website + "'><img width='30' height='30' src='http://cs-server.usc.edu:45678/hw/hw8/images/w.png'/></a>";
        document.getElementById("SoLiTd").innerHTML = $scope.LegislatorSocialLinks;
        var termStart = new Date(legislator.term_start);
        var termEnd = new Date(legislator.term_end);
        var dateNow = Date.now();
        $scope.termPercent = Math.round(((dateNow - termStart.getTime()) / (termEnd.getTime() - termStart.getTime())) * 100);
        $scope.formatedTS = moment(legislator.term_start, "YYYY-MM-DD").format("MMM DD, YYYY");
        $scope.formatedTE = moment(legislator.term_end, "YYYY-MM-DD").format("MMM DD, YYYY");
        $scope.formatedBD = moment(legislator.birthday, "YYYY-MM-DD").format("MMM DD, YYYY");
        $scope.selectedLegislator.isMarkedFav = false;
        var object = JSON.parse(localStorage.getItem("L"));
        object = object == null ? [] : object;
        $scope.favLegislators = object;
        for (var j = 0; j < object.length; j++) {
            if (legislator.bioguide_id == object[j].bioguide_id) {
                $scope.selectedLegislator.isMarkedFav = true;
                break;
            }
        }

    };
    $scope.stateList = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "district of columbia", "florida", "georgia", "guam", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "palau", "pennsylvania", "puerto rico", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virgin Islands", "virginia", "washington", "west Virginia", "wisconsin", "wyoming"];
    $http.get('index.php/?database=legislators&per_page=all').success(function(response){
    //$http.get('leg.json').success(function(response) {
        $scope.legislators = response.results;
    });
    $scope.LegislatorTabChange = function(tab) {
        document.getElementById('seBoLeDp').selectedIndex=0 ;
        $('#seBoLe').val('');
        $scope.searchLegi = "";
        switch (tab) {
            case "state":
                $scope.chamberFilterLegis = '';
                $scope.orderCriteriaLegis = ['state', 'last_name'];
                $scope.isStateTab = true;
                $scope.LegisTabTitleTxt = 'State';
                $scope.isHouseTab = false;
                $scope.isSenateTab = false;
                $("#leSt").removeClass("active").addClass("active");
                $("#leHo").removeClass("active");
                $("#leSe").removeClass("active");
                break;
            case "house":
                $scope.chamberFilterLegis = 'house';
                $scope.orderCriteriaLegis = ['last_name'];
                $scope.isStateTab = false;
                $scope.LegisTabTitleTxt = 'House';
                $scope.isHouseTab = true;
                $scope.isSenateTab = false;
                $("#leSt").removeClass("active");
                $("#leHo").removeClass("active").addClass("active");
                $("#leSe").removeClass("active");
                break;
            case "senate":
                $scope.chamberFilterLegis = 'senate';
                $scope.orderCriteriaLegis = ['last_name'];
                $scope.isStateTab = false;
                $scope.LegisTabTitleTxt = 'Senate';
                $scope.isHouseTab = false;
                $scope.isSenateTab = true;
                $("#leSt").removeClass("active");
                $("#leHo").removeClass("active");
                $("#leSe").removeClass("active").addClass("active");
                break;
        }
    };
    $scope.LegiFavBtnClick = function(data) {
        if (data.isMarkedFav) {
            var object = JSON.parse(localStorage.getItem("L"));
            object = object == null ? [] : object;
            $scope.favLegislators = object;
            for (var k = 0; k < object.length - 1; k++) {
                if (object[k].bioguide_id == data.bioguide_id) {
                    for (var l = k; l < object.length - 1; l++) {
                        object[k] = object[k + 1];
                    }
                    break;
                }
            }
            object = object.slice(0, object.length - 1);
            localStorage.setItem("L", JSON.stringify(object));
            $scope.selectedLegislator.isMarkedFav = false;
            $scope.favLegislators = object;
        } else {
            favBtnClick('L', data);
            $scope.selectedLegislator.isMarkedFav = true;
            var object = JSON.parse(localStorage.getItem("L"));
            object = object == null ? [] : object;
            $scope.favLegislators = object;
        }
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    $scope.bills = [];
    $scope.currentPageBills = 1;
    $scope.BillTabTitleTxt = "Active Bills";
    $scope.isActiveBills = true;
    $scope.formatedIO = "";
    $scope.orderCriteriaBills = ['-introduced_on'];
    $http.get('index.php/?database=bills&per_page=50&bill_active=true&bill_haspdf=true').success(function(response){
    //$http.get('bills.json').success(function(response) {
        $scope.bills = response.results;
        $http.get('index.php/?database=bills&per_page=50&bill_active=false&bill_haspdf=true').success(function(response){
        $scope.bills = $scope.bills.concat(response.results);
    });
    });
    $scope.BillsBackClick = function() {
        $('#carousel-bills').carousel(0);
    };
    $scope.BillsDetails = function(bill) {
        $scope.selectedBill = bill;
        $('#carousel-bills').carousel(1);
        $scope.formatedIO = moment(bill.introduced_on, "YYYY-MM-DD").format("MMM DD, YYYY");
        $scope.selectedBill.isMarkedFav = false;
        var object = JSON.parse(localStorage.getItem("B"));
        object = object == null ? [] : object;
        $scope.favBills = object;
        for (var j = 0; j < object.length; j++) {
            if (bill.bill_id == object[j].bill_id) {
                $scope.selectedBill.isMarkedFav = true;
                break;
            }
        }
    };
    $scope.BillTabChange = function(tab) {
        $('#seBoBi').val('');
        $scope.searchBill = "";
        switch (tab) {
            case "Active Bills":
                $scope.BillTabTitleTxt = 'Active Bills';
                $scope.isActiveBills = true;
                $("#biAb").removeClass("active").addClass("active");
                $("#biNb").removeClass("active");
                break;
            case "New Bills":
                $scope.BillTabTitleTxt = 'New Bills';
                $scope.isActiveBills = false;
                $("#biAb").removeClass("active");
                $("#biNb").removeClass("active").addClass("active");
                break;
        }
    };
    $scope.BillFavBtnClick = function(data) {
        if (data.isMarkedFav) {
            var object = JSON.parse(localStorage.getItem("B"));
            object = object == null ? [] : object;
            for (var k = 0; k < object.length - 1; k++) {
                if (object[k].bill_id == data.bill_id) {
                    for (var l = k; l < object.length - 1; l++) {
                        object[k] = object[k + 1];
                    }
                    break;
                }
            }
            object = object.slice(0, object.length - 1);
            localStorage.setItem("B", JSON.stringify(object));
            $scope.selectedBill.isMarkedFav = false;
            $scope.favBills = object;
        } else {
            favBtnClick('B', data);
            $scope.selectedBill.isMarkedFav = true;
            var object = JSON.parse(localStorage.getItem("B"));
            object = object == null ? [] : object;
            $scope.favBills = object;
        }

    };
});

function favBtnClick(type, data) {
    var object = JSON.parse(localStorage.getItem(type));
    object = object == null ? [] : object;
    for (var i = 0; i < object.length; i++) {
        if (type == "L" && object[i].bioguide_id == data.bioguide_id)
            return;
        if (type == "B" && object[i].bill_id == data.bill_id)
            return;
        if (type == "C" && object[i].committee_id == data.committee_id)
            return;
    }
    object = object.concat(data);
    localStorage.setItem(type, JSON.stringify(object));
}