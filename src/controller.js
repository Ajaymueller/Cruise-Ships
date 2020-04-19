(function exportController() {
    function Controller(ship) {
        this.ship = ship;


        this.initialiseSea();
        this.headsUpDisplayMessage()

        document.querySelector("#sailbutton").addEventListener('click', () => {
            this.setSail();
        });

    };

    Controller.prototype.initialiseSea = function initialiseSea() {
        const backgrounds = [
            './images/water0.png',
            './images/water1.png', 
        ];
        let backgroundIndex = 0;
        window.setInterval(() => {
            document.querySelector("#viewport").style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
            backgroundIndex += 1;
          }, 1000);
    };
    /*Controller.prototype.initialiseSea = function initialiseSea() {
        colors = ['red', 'blue'];
        colorIndex = 0;
        var oElem = document.querySelector("#viewport");
        window.setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        oElem.style.backgroundColor = colors[colorIndex];
        }, 5000);
    };*/

    
   /*document.getElementById("sailbutton").addEventListener("mouseover", () => {
        button.style.boxShadow = '2px 2px 2px grey';
        button.style.width = "110";
    });*/

    Controller.prototype.renderPorts = function renderPorts(ports) {
        const portsElement = document.querySelector("#ports");
        portsElement.style.width = '0px';
        ports.forEach((port, index) => {
        const newPortElement = document.createElement('div');
        newPortElement.className = 'port';
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        portsElement.appendChild(newPortElement);
        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
        })
    }

    Controller.prototype.renderShip = function renderShip() {
        const ship = this.ship;
        const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
        const shipElement = document.querySelector('#ship');
        shipElement.style.top = `${portElement.offsetTop + 32}px`;
        shipElement.style.left = `${portElement.offsetLeft - 32}px`;

    }

    Controller.prototype.setSail = function setSail() {
        
        const ship = this.ship
        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
        this.renderMessage(`now departing ${ship.currentPort.name}`);
    
        if (!nextPortElement) {
            return this.renderMessage(`${ship.currentPort.name} is the last port`);
        }

        //this.renderMessage(`now departing ${ship.currentPort.name}`);
        
        const shipElement = document.querySelector('#ship');
        const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
            if (shipLeft === (nextPortElement.offsetLeft - 32)) {
                ship.setSail();
                ship.dock();
                //this.renderMessage(`Now arriving at ${ship.currentPort.name}`)
                clearInterval(sailInterval);
            }
            shipElement.style.left = `${shipLeft + 1}px`;
        }, 20);

        console.log(nextPortIndex);
        
    }

    Controller.prototype.renderMessage = function renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.id = 'message';
        messageElement.innerHTML = message;
        const viewport = document.querySelector('#viewport');
        viewport.appendChild(messageElement);

        setTimeout(() => {
            viewport.removeChild(messageElement);
        }, 2000);
    };

    Controller.prototype.headsUpDisplayMessage = function headsUpDisplayMessage() {
        const ship = this.ship;
        const currentPort = document.getElementById("currentport");
        if (ship.currentPort !== undefined) {
            currentPort.textContent = `Current Port: ${ship.currentPort.name}`;
        };

        const nextPort = document.getElementById("nextport");
        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
        if (nextPortElement === undefined) {
            nextPort.textContent = ;
        }


    };




    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
      } else {
        window.Controller = Controller;
      }
}());