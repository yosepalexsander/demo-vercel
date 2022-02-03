# Array of Object Manipulation

## Create Blogs Array
```javascript
// create array to store blog, initialize with one element first
const blogs = [{
  id: 1,
  title: 'Pasar Coding di Indonesia Dinilai Masih Menjanjikan',
  post_date: '12 Jul 2021 22:30 WIB',
  author: 'Ichsan Emrald Alamsyah',
  content: `Ketimpangan sumber daya manusia (SDM) di sektor digital masih
  menjadi isu yang belum terpecahkan. Berdasarkan penelitian
  ManpowerGroup, ketimpangan SDM global, termasuk Indonesia,
  meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum,
  dolor sit amet consectetur adipisicing elit. Quam, molestiae
  numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta,
  eligendi debitis?`
}]
```

## Get Blog route with POST method
```javascript
// define route for receive post data from client
app.post('/blog', (req, res) => {
  console.log({
    title: req.body.title,
    content: req.body.content
  })
  const blog = {
    title: req.body.title,
    post_date: '12 Jul 2021 22:30 WIB',
    author: 'Ichsan Emrald Alamsyah',
    content: req.body.content,
  }

  // store new post blog to blogs array
  blogs.push(blog)

  // redirect to specific route
  res.redirect('/blog')
})
```

## Delete Blog using Splice
```javascript
// define route for handling delete post
app.get('/delete-blog/:id', (req, res) => {
  // get blog index by fetch req params
  const index = req.params.id

  // remove blog at specific index with count number equal to 1
  blogs.splice(index, 1)

  // redirect to blog route for refetch blog page
  res.redirect('/blog')
})
```

## Render in blog.hbs using each
```hbs
<!-- Blog list -->
<div id="contents" class="blog-list">
  <div class="button-group w-100">
    <a href="/add-blog" class="btn-post">Add New Blog</a>
  </div>
  <!-- dynamic content would be here -->
  <!-- using each expression to iterate blogs data sent -->
  {{#each blogs}}
  <div class="blog-list-item">
    <div class="blog-image">
      <img src="/public/assets/blog-img.png" alt="Pasar Coding di Indonesia Dinilai Masih Menjanjikan" />
    </div>
    <div class="blog-content">
      <!-- conditional post blog -->
      <!-- update isLogin to ../isLogin -->
      {{#if ../isLogin}}
      <div class="button-group">
        <a class="btn-edit">Edit Post</a>
        <a href="/delete-blog/{{@index}}" class="btn-post">Delete Blog</a>
      </div>
      {{/if}}
      <h1>
        <a href="/blog/{{@index}}" target="_blank">{{this.title}}</a>
      </h1>
      <div class="detail-blog-content">
        {{this.post_date}} | {{this.author}}
      </div>
      <p>{{this.content}}</p>
    </div>
  </div>
  {{/each}}
</div>
```