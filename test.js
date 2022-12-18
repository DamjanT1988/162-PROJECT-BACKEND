/********************************************* 
 * Get complete listing
 *********************************************/
router.get('/', function (req, res, next) {
    Product.find(function (err, productsMongo) {
      if (err) return console.error(err);
      var products = productsMongo;
  
      var jsonObj = JSON.stringify(products);
      res.contentType('application/json');
      res.send(jsonObj);
    });
  });
  
  
  /********************************************* 
   * Get unique id
   *********************************************/
  router.get('/:id', function (req, res, next) {
    Product.find(function (err, productsMongo) {
      if (err) return console.error(err);
      var products = productsMongo;
  
      var id = req.params.id;
      var ind = -1;
  
      for (var i = 0; i < products.length; i++) {
        if (products[i]._id == id) ind = i;
      }
      res.contentType('application/json');
      res.send(ind >= 0 ? products[ind] : '{}');
    });
  });
  
  /********************************************* 
   * Update product
   *********************************************/
  router.put('/:id', function (req, res, next) {
    Product.find(function (err, keyMongo) {
      if (err) return console.error(err);
      var id = req.params.id;
      var body = req.body;
  
      res.contentType('application/json');
      res.send(id + " product updated!");
  
      Product.updateOne({ _id: id }, { $set: body }, function 
        (err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log("Result :", result)
        }
      });
    });
  });
  
  /********************************************* 
   * Delete unique course id
   *********************************************/
  router.delete('/:id', function (req, res, next) {
    Product.find(function (err, productsMongo) {
      if (err) return console.error(err);
      var products = productsMongo;
      var id = req.params.id;
      var del = -1;
  
      for (var i = 0; i < products.length; i++) {
        if (products[i]._id == id) del = i;
      }
      if (del >= 0) status = products.splice(del, 1);
  
      res.contentType('application/json');
      res.send(id);
  
      Product.deleteOne({ _id: id }, function (err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log("Result :", result)
        }
      });
    });
  });
  
  /********************************************* 
   * Add new product
   *********************************************/
  router.post('/', function (req, res, next) {
    Product.find(function (err, productsMongo) {
      if (err) return console.error(err);
      var products = productsMongo;
  
      products.push(req.body);
      var jsonObj = JSON.stringify(products);
      res.contentType('application/json');
      res.send(jsonObj);
  
      var product = new Product(req.body);
  
      product.save(function (err) {
        if (err) return console.error(err);
      });
    });
  });