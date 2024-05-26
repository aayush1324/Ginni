getProduct(): void {
    const UserID = sessionStorage.getItem('UserID');
    
    if(UserID == null){
        this.productService.getProductsWithImages().subscribe({
          next: (res) => {
            console.log(res);
            this.productLength = res.length;
            res.forEach(item => {
              if (item.imageData) {
                // Prepend 'data:image/jpeg;base64,' to the imageData field
                item.imageData = 'data:image/jpeg;base64,' + item.imageData;
              }
            });
            this.productlist = res.slice(0, 5);
            console.log(this.productlist);
          },
          error: (err) => {
            console.error('Error fetching addresses:', err);
          }
        });
    }
      else {
        this.productService.getProductsWithImage(UserID).subscribe({
          next: (res) => {
            console.log(res);
            this.productLength = res.length;
            res.forEach(item => {
              if (item.imageData) {
                // Prepend 'data:image/jpeg;base64,' to the imageData field
                item.imageData = 'data:image/jpeg;base64,' + item.imageData;
              }
            });
            this.productlist = res.slice(0, 5);
            console.log(this.productlist);
          },
          error: (err) => {
            console.error('Error fetching addresses:', err);
          }
        });
      }        
  }
