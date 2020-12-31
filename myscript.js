const URL = "https://covid19.mathdro.id/api";

let app = angular.module("CovidApp", ['ui.bootstrap']);

app.controller("CovidCtrl", ($scope, $http) => {
    $scope.title = "Stay Home Stay Safe"

    console.log("APP LOADED");

    //calling API

    $http.get(URL).then(
        (response) => {
            //success
            var allData = "";

            $scope.allData = response.data;
            $scope.recovered = $scope.allData.recovered.value;
            $scope.confirmed = $scope.allData.confirmed.value;
            $scope.deaths = $scope.allData.deaths.value;
            Highcharts.chart('allData', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'COVID CASES ON PLANET EARTH'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'recovered',
                        y: $scope.recovered
                    }, {
                        name: 'deaths',
                        y: $scope.deaths
                    }, {
                        name: 'confirmed',
                        y: $scope.confirmed
                    }]
                }]
            });
            // console.log(allData);
        },
        (error) => {
            //error
            console.log(error);
        }
    );

    //get country data

    $scope.getCountryData = () => {
        //console.log($scope.countryName);
        let country = $scope.countryName;
        if (country == "") {
            $scope.countryData = undefined;
            return;
        }

        $http.get(`${URL}/countries/${country}`).then(
            (response) => {
                console.log(response.data);
                $scope.countryData = response.data;
                $scope.recovered = response.data.recovered.value;
                $scope.confirmed = response.data.confirmed.value;
                $scope.deaths = response.data.deaths.value;
                Highcharts.chart('container', {
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45
                        }
                    },
                    title: {
                        text: 'Data in pie chart'
                    },
                    plotOptions: {
                        pie: {
                            innerSize: 100,
                            depth: 45
                        }
                    },
                    series: [{
                        name: 'Delivered amount',
                        data: [
                            ['Confirmed', $scope.confirmed],
                            ['Recovered', $scope.recovered],
                            ['Deaths', $scope.deaths]
                        ]
                    }]
                });
            },
            (error) => {
                // console.log(error);
            }
        )
    }


});