window.onload = function() {
    var list = document.querySelector('.list');
    var content = document.querySelector('.content');
    var peopleInfo = document.querySelector('.peopleInfo');
    var buttonPrevious = document.querySelector('.buttonPrevious');
    var buttonNext = document.querySelector('.buttonNext');
    var buttonBack = document.querySelector('.buttonBack');
    var name = document.querySelector('.name');
    var birthYear = document.querySelector('.birth_year');
    var gender = document.querySelector('.gender');
    var films = document.querySelector('.films');
    var homeworld = document.querySelector('.homeworld');
    var species = document.querySelector('.species');

    var page = 1;
    var url = 'https://swapi.dev/api/people/?page=' + page;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    fillPeople();
    var people, peopleResults;

    function fillPeople() {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                people = JSON.parse(this.response);
                peopleResults = people.results;
                for (let i = 0; i < 10; i++) {
                    if (peopleResults[i] == null) {
                        list.children[i].innerHTML = '';
                    } else {
                        list.children[i].innerHTML = peopleResults[i].name;
                        list.children[i].onmousedown = null;
                        list.children[i].onmousedown = function() {
                            var thisPeople = peopleResults[i];
                            showInfo(thisPeople);
                        }
                    }
                }
            }
        };
    }

    buttonPrevious.addEventListener('click', previousPage);
    buttonNext.addEventListener('click', nextPage);

    function previousPage() {
        if (page == 1) {
            page = 1;
            url = 'https://swapi.dev/api/people/?page=' + page;
        } else {
            page--;
            url = 'https://swapi.dev/api/people/?page=' + page;
        }
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        fillPeople();
    }

    function nextPage() {
        if (page == 9) {
            page = 1;
            url = 'https://swapi.dev/api/people/?page=' + page;
        } else {
            page++;
            url = 'https://swapi.dev/api/people/?page=' + page;
        }
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        fillPeople();
    }


    function showInfo(thisPeople) {
        peopleInfo.classList.toggle('hidden');
        content.classList.toggle('hidden');
        fillPeopleInfo(thisPeople);
    }
    buttonBack.addEventListener('click', backFoo);

    function backFoo() {
        peopleInfo.classList.toggle('hidden');
        content.classList.toggle('hidden');
    }

    function fillPeopleInfo(thisPeople) {
        name.innerHTML = thisPeople.name;
        birthYear.innerHTML = "birth year: " + thisPeople['birth_year'];
        gender.innerHTML = "gender: " + thisPeople['gender'];

        var filmInfo = thisPeople.films;
        getInfoFromServ(filmInfo, films);

        function getInfoFromServ(info, whereToAdd) {
            films.innerHTML = 'films:<ul class="filmsList"></ul>';
            var filmsList = document.querySelector('.filmsList');
            for (let i = 0; i < info.length; i++) {
                let xmlhttpInfo = new XMLHttpRequest();
                xmlhttpInfo.open('GET', info[i], true);
                xmlhttpInfo.send();
                xmlhttpInfo.onreadystatechange = function() {
                    if (xmlhttpInfo.readyState === 4 && xmlhttpInfo.status === 200) {
                        var getInfo = JSON.parse(xmlhttpInfo.response);
                        if (getInfo.name == undefined) {
                            filmsList.insertAdjacentHTML('afterBegin', '<li>' + getInfo.title + '</li>');
                        } else {
                            whereToAdd.innerHTML = "species: " + getInfo.name;
                        }
                    }
                }
            }
        }

        var homeworldInfo = thisPeople.homeworld;
        getInfoFromHomeworld(homeworldInfo, homeworld);

        function getInfoFromHomeworld(info, whereToAdd) {
            let xmlhttpInfo = new XMLHttpRequest();
            xmlhttpInfo.open('GET', info, true);
            xmlhttpInfo.send();
            xmlhttpInfo.onreadystatechange = function() {
                if (xmlhttpInfo.readyState === 4 && xmlhttpInfo.status === 200) {
                    var getInfo = JSON.parse(xmlhttpInfo.response);
                    whereToAdd.innerHTML = "homeworld: " + getInfo.name;
                }
            }
        }

        var speciesInfo = thisPeople.species;
        getInfoFromSpecies(speciesInfo, species);

        function getInfoFromSpecies(info, whereToAdd) {
            if (info.length == 0) {
                whereToAdd.innerHTML = "species: " + ' human';
            } else {
                for (let i = 0; i < info.length; i++) {
                    let xmlhttpInfo = new XMLHttpRequest();
                    xmlhttpInfo.open('GET', info[i], true);
                    xmlhttpInfo.send();
                    xmlhttpInfo.onreadystatechange = function() {
                        if (xmlhttpInfo.readyState === 4 && xmlhttpInfo.status === 200) {
                            var getInfo = JSON.parse(xmlhttpInfo.response);
                            whereToAdd.innerHTML = "species: " + getInfo.name;
                        }
                    }
                }
            }
        }
    }
}