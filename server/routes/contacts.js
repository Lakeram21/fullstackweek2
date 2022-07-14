var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contacts');



router.get('/', (req, res, next) => {
Contact.find().populate('group').
  then(customers => {              
     res.status(200).json(customers)
  }).catch(err => console.log('Caught:', err.message));
})


router.get('/:id', (req, res, next) => {
Contact.findOne({_id: req.params.id}).populate('group').
  then(customers => {              
     res.status(200).json(customers)
  }).catch(err => console.log('Caught:', err.message));
})

/************************************************
 * CREATING A DOCUMENT
**************************************************/
router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: null
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Document added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});


/****************************************************************
 * UPDATING A DOCUMENT
 *****************************************************************/
router.put('/:id', (req, res, next) => {
  Contact.findOne({_id: req.params.id })
    .then(contact => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.url;
      contact.group = req.body.group;
    

      Contact.updateOne({ id: req.params.id }, contact)
        .then(res => {
          res.status(204).json({
            message: 'Contact updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found'}
      });
    });
});

/***********************************
 * DELETE A DOCUMENT
 ************************************/
router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found'}
      });
    });
});

module.exports = router; 