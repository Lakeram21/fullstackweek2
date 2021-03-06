var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/documents');


router.get('/', (req, res, next) => {
Document.find().
  then(customers => {              
     res.status(200).json(customers)
  }).catch(err => console.log('Caught:', err.message));
})


/******************************
 * Get a single entry
 * ************************* */
router.get('/:id', (req, res, next) => {
Document.findOne({_id:req.params.id}).
  then(document => {              
     res.status(200).json(document)
  }).catch(err => console.log('Caught:', err.message));
})


/************************************************
 * CREATING A DOCUMENT
**************************************************/
router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});


/***********************************
 * UPDATING A DOCUMENT
 ************************************/
router.put('/:id', (req, res, next) => {
  Document.findOne({id: req.params.id })
    .then(document => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error.message
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});

/***********************************
 * DELETE A DOCUMENT
 ************************************/
router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
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
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});

module.exports = router; 