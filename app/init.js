/**
 * photoUrl: string[url]
 * author: string
 * body: string
 * created: datetime
 * score: number
 * votes: {  /// DICTIONARY
 *      userId: 0, -1, 1
 * }
 */
String.prototype.truncate = function(n){
    if(this.length > n){
        return this.slice(0, n) + '...'
    }
    return this
}

var allPosts = []

var id = 864
function Post(photoUrl, author, body) {
    this.photoUrl = photoUrl
    this.author = author
    this.body = body

    //DEFAULT PROPERTIES
    this.score = 0
    this.votes = {
        up: 0,
        down: 0
    }
    this.created = Date.now()

    // FAKE CHEATER ID GEN NOT NEEDED IN REAL PRODUCTION
    this.id = id
    id++
    allPosts.push(this)
}

new Post('//placehold.it/80x80', 'Kermit da Frog', 'I no longer LOVE PIGGY :(')
new Post('//placehold.it/80x80', 'Miss Piggy formely (known as Piggy da Frog)', 'I hate you too')
new Post('//placehold.it/80x80', 'Fozzy Bear', 'I am single WAKA WAKA WAKA!')
new Post('//placehold.it/80x80', 'ANIMAL', 'I LOVE BACON!!!')


// <!-- POST -->
/* <div class="col-md-6 offset-md-3 col-sm-12">
    <div class="card p-3">
        <div class="card-details flex">
            <div class="person-details">
                <img src="//placehold.it/80x80" alt="">
                <h4>Name</h4>
            </div>
            <div class="post-details m-l-1">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, id.</p>
                <div>
                    <button class="btn">UP</button>
                    <button class="btn">DOWN</button>
                </div>
            </div>
        </div>
    </div>
</div> */
//<!-- END POST -->
var postsContainerElem = document.getElementById('posts-container')
function draw(posts) {
    var template = ''

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        template += `
        <!-- POST -->
            <div class="col-md-6 offset-md-3 col-sm-12">
                <div class="card p-3">
                    <div class="card-details flex">
                        <div class="person-details">
                            <img src="${post.photoUrl}" alt="">
                            <h4>${post.author.truncate(8)}</h4>
                        </div>
                        <div class="post-details m-l-1">
                            <p>${post.body}</p>
                            <div>
                                <button class="btn btn-info" onclick="vote(1, '${post.id}')">UP</button>
                                <button class="btn btn-danger" onclick="vote(-1, '${post.id}')">DOWN</button>
                                <span>${post.score}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END POST -->
        `
    }
    postsContainerElem.innerHTML = template
}

draw(allPosts)

function getPostsByAuthor(name) {
    draw(allPosts.filter(p => p.author == name))
}


function vote(n, postId){

    // WRITE  FN that finds a post by its id
    // increases the count by n

    for (let i = 0; i < allPosts.length; i++) {
        const post = allPosts[i];
        if (postId == post.id) {
            post.score += n
            if(n < 0) {
                post.votes.down++
            } else {
                post.votes.up++
            }
        }
    }

    allPosts.sort(function(a, b){
        return b.score - a.score
    })

    draw(allPosts)

}















// posts.splice(2, 0, this) reorder the array