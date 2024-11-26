class Car {
    brand;
    model;
    #speed;
    isTrunkOPen;
    trunkMsg;
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.#speed = 0;
        this.isTrunkOPen = false;
        this.trunkMsg = '';
    }

    displayInfo() {
        if (this.isTrunkOPen === true) {
            this.trunkMsg = 'open';
        } else {
            this.trunkMsg = 'close'
        }
        console.log(`${this.brand}, ${this.model}, ${this.#speed} Km/h, trunk: ${this.trunkMsg}`);
        this.trunkMsg = '';
    }

    go() {
        if (0 <= this.#speed <= 200) {
            this.#speed += 5;
        }
    }

    brake() {
        if (0 <= this.#speed <= 200) {
            this.#speed -= 5;
        }
    }

    openTrunk() {
        if (this.isTrunkOPen === false) {
            this.isTrunkOPen = true;
        }
    }

    closeTrunk() {
        if (this.isTrunkOPen === true) {
            this.isTrunkOPen = false;
        }
    }
}

const toyota = new Car('toyota', 'corola');
const tesla = new Car('tesla', 'Model 3');
toyota.go();
toyota.go();
toyota.go();
toyota.go();
toyota.openTrunk();
tesla.openTrunk();
toyota.closeTrunk();
toyota.displayInfo();
tesla.displayInfo();

class RaceCar extends Car {
    acceleration;
    #speed;

    constructor(brand, model) {
        super(brand, model);
        this.acceleration = 0;
        this.#speed = 0;
    }

    displayInfo() {
        console.log(`Brand:${this.brand} Model:${this.model} acceleration: ${this.acceleration} speed: ${this.#speed}`);
    }

    accelerating(accelerate) {
        this.acceleration = accelerate;
    }

    go() {
        if (0 <= this.#speed <= 300) {
            this.#speed += this.acceleration;
        }
    }

    brake() {
        if (0 <= this.#speed <= 300) {
            this.#speed -= this.acceleration / 2;
        }
    }

    openTrunk() {
        return;
    }

    closeTrunk() {
        return;
    }
}

const koenigsegg = new RaceCar('mclaren', 'jesko');

koenigsegg.accelerating(20);
koenigsegg.displayInfo();
koenigsegg.go();
koenigsegg.go();
koenigsegg.brake();
koenigsegg.displayInfo();