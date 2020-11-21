var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];
let primaryId = 3

// GET /api/owners
app.get('/api/owners', (req, res) => {
    res.status(200).send(owners)
})

// GET /api/owners/:id
app.get('/api/owners/:id', (req, res) => {
    const ownersId = req.params.id;

    let ownerItem = owners.find((owner) => {
        return owner.id === Number(ownersId);
    })

    res.status(200).send(ownerItem)
})

// POST /api/owners
app.post('/api/owners', (req, res) => {

    owners.push({
        id: primaryId,
        name: req.body.name, 
        pets: []
    });

    primaryId++

    res.status(200).send(owners)
})

// PUT /api/owners/:id
app.put('/api/owners/:id', (req, res) => {
    const ownersId = req.params.id;

    let ownerItem = owners.find((owner) => {
        return owner.id === Number(ownersId);
    })

    ownerItem.name = req.body.name

    res.status(200).send(owners)
})

// DELETE /api/owners/:id
app.delete('/api/owners/:id', (req, res) => {
    const ownersId = req.params.id;

    let ownerItem = owners.find((owner) => {
        return owner.id === Number(ownersId);
    })

    for(let i = 0; i <= owners.length; i++) {
        if(owners[i] === ownerItem) {
            owners.splice(i, 1)
        }
    }

    res.status(200).send(owners)
})

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', (req, res) => {
    const ownersId = req.params.id;

    let ownerItem = owners.find((owner) => {
        return owner.id === Number(ownersId);
    })

    res.status(200).send(ownerItem.pets)
})

// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', (req, res) => {
    const ownersId = req.params.id;
    const petId = req.params.petId;

    let ownerItem = owners.find((owner) => {
        return Number(ownersId) === Number(owner.id);
    });

    let thisPet = ownerItem.pets.find((pet) => {
        return Number(pet.id) === Number(petId);
    });

    res.status(200).send(thisPet);
})

// POST /api/owners/:id/pets
app.post('/api/owners/:id/pets', (req, res) => {
    const ownersId = req.params.id;

    let ownerItem = owners.find((owner) => {
        return Number(ownersId) === Number(owner.id);
    });

    ownerItem.pets.push({
        id: ownerItem.pets.length + 1,
        name: req.body.name,
        type: req.body.type
    });

    res.status(200).send({
        ownerItem,
        message: `${ownerItem.name}'s pet successfully added`
    });
});

// PUT /api/owners/:id/pets/:petId
app.put('/api/owners/:id/pets/:petId', (req, res) => {
    const ownerId = req.params.id;
    const petId = req.params.petId;

    let ownerItem = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    let ownerIndex = owners.findIndex((owner) => {
        return owner === ownerItem;
    });

    let petIndex = ownerItem.pets.findIndex((pet) => {
        return Number(pet.id) === Number(petId);
    });

    owners[ownerIndex].pets[petIndex] = req.body;
    res.status(200).send(ownerItem);
});

// DELETE /api/owners/:id/pets/:petId
app.delete('/api/owners/:id/pets/:petId', (req, res) => {
    const ownerId = req.params.id;
    const petId = req.params.petId;

    let ownerItem = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    let petItem = ownerItem.pets.find((pet) => {
        return Number(pet.id) === Number(petId);
    });

    let petIndex = ownerItem.pets.findIndex((pet) => {
        return Number(pet.id) === Number(petItem.id)
    });

    ownerItem.pets.splice(petIndex, 1)

    res.status(200).send(ownerItem);
});

app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})