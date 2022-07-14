var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/messages');


router.get('/', (req, res, next) => {
   
    Message.find().then(result=>{
     res.status(200).json({
        message: 'Message successfully Retrived',
        messages: result
      }).catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
        }) 
    })
});

/************************************************
 * CREATING A Message
**************************************************/
router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const messages = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  messages.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'message added successfully',
        message: createdMessage
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
 * UPDATING A Message
 *****************************************************************/
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(messages => {
      messages.subject = req.body.subject;
      messages.msgText = req.body.msgText;
      messages.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, messages)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           messages: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});

/***********************************
 * DELETE A Message
 ************************************/
router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
    .then(messages => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
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
        message: 'Message not found.',
        error: { messages: 'Message not found'}
      });
    });
});

module.exports = router; 