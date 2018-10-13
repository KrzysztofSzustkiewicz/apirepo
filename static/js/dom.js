let dom = {
    next: null,
    previous: null,
    apiUrl: 'https://swapi.co/api/planets/?page=1',
    fetchPlanets: function() {
        fetch(this.apiUrl)
        .then(res => res.json())
        .then((data) => {
            data.results.forEach(function(planet){
                let table = document.getElementById('tableBody');
                let output = '';
                output += `
                    <tr>
                        <td>${planet.name}</td>
                        <td>${dom.diameterDisplay(planet.diameter)}</td>
                        <td>${planet.climate}</td>
                        <td>${planet.terrain}</td>
                        <td>${dom.surfaceDisplay(planet.surface_water)}</td>
                        <td>${dom.populationDisplay(planet.population)}</td>
                        <td>${dom.displayResidentButton(planet.residents, planet.name)}</td>
                    </tr>`;
                table.innerHTML += output;
            });
            this.next = data.next;
            this.previous = data.previous;
        })
    },
    buttonActiveNext: function() {
        if (this.next !== null) {
            document.getElementById('tableBody').innerHTML = '';
            this.apiUrl = this.next;
            this.fetchPlanets();
        }

    },
    buttonActivePrevious: function() {
        if (this.previous !== null) {
            document.getElementById('tableBody').innerHTML = '';
            this.apiUrl = this.previous;
            this.fetchPlanets();
        }

    },
    diameterDisplay: function(value) {
        if (value === 'unknown') {
            return `${value}`;
        } else {
            return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km`;
        }
    },
    surfaceDisplay: function(value) {
        if (value === 'unknown') {
            return `${value}`;
        } else {
            return  `${value}%`;
        }
    },
    populationDisplay: function(value) {
        if (value === 'unknown') {
            return `${value}`;
        } else {
            return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} people`;
        }
    },
    displayResidentButton: function(value, name) {
        if (value.length === 0 ) {
            return `No known residents`;
        } else {
            return `<button type="button" onclick="dom.loadResidents(\`` +value+ `\`, \`` +name+ `\`)" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModal"> ${value.length} resident(s)</button>`;
        }
    },
    loadResidents: function(apiData, planet) {
        let resList = apiData.split(',');
        let title = document.getElementById('exampleModalLabel');
        title.innerHTML = '';
        title.innerHTML = 'Residents of ' +planet;
        let table = document.getElementById('residentsTableBody');
        table.innerHTML = '';
        resList.forEach(function(apiLink) {
            fetch(apiLink)
                .then(res => res.json())
                .then(data => {
                    let output = '';
                        output += `
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.height}</td>
                        <td>${data.mass}</td>
                        <td>${data.hair_color}</td>
                        <td>${data.skin_color}</td>
                        <td>${data.eye_color}</td>
                        <td>${data.birth_year}</td>
                        <td>${data.gender}</td>
                    </tr>`;
                        table.innerHTML += output;
                })
        })
    },
    loginToServer: function() {
        let userLogin = document.getElementById('login-user-name').value;
        let userPassword = document.getElementById('login-user-password').value;
        let data = {'username': userLogin, 'password': userPassword};
        fetch('/login', {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data == 'Accepted') {
                    $('#loginModal').modal("hide");
                    dom.displayNavBar();
                    return

                } else {
                    return swal ( "Oops" ,  "Something went wrong!" ,  "error" )
                }
            })
    },
    modalToggle: function (modalId) {
        return $(modalId).modal("show")
    },
    displayNavBar: function() {
        let navBar = document.getElementById('navbarSupportedContent');
        fetch('/status')
            .then(response => response.json())
            .then(data => {
                if (data.logged == 'Logged') {
                    navBar.innerHTML = `
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <button type="button" class="btn btn-light mr-1 ml-1" disabled>
                                Registration
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="btn btn-light mr-1 ml-1" disabled>
                                Login
                            </button>
                        </li>
                        <li class="nav-item">
                            <a href="/logout" role="button" class="btn btn-light mr-1 ml-1">Logout</a>
                        </li>
                        </ul>
                        <span class="navbar-text" id="userStatus">
                            Logged in as ${data.username}
                        </span>`
                } else {
                    navBar.innerHTML =`
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <button type="button" class="btn btn-light mr-1 ml-1" onclick="dom.modalToggle('#registerModal')">
                                Registration
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="btn btn-light mr-1 ml-1" onclick="dom.modalToggle('#loginModal')">
                                Login
                            </button>
                        </li>
                        <li class="nav-item">
                            <a href="/logout" role="button" class="btn btn-light mr-1 ml-1 disabled">Logout</a>
                        </li>
                
                    </ul>
                    <span class="navbar-text" id="userStatus">
                        You are not logged in
                    </span>`
                }
            }
        )

    }

};

dom.displayNavBar();
dom.fetchPlanets();