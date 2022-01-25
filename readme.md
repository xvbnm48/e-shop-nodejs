this is node js course 
link [NODE JS E SHOP](https://www.udemy.com/course/nodejs-build-complete-ecommerce-web-api/learn/lecture/24250940#overview)
i will do best 

now at part 24
ini kalo mau pakai post tanpa async

```javascript
 product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
```


ada error di npm nya harus bikin repo baru ini
