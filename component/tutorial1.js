var CommentBox = React.createClass({
  render: function() {
      return (
        <div className='commentbox'>
          <h1>Comments</h1>
          <CommentList data={this.props.data}/>
          <CommentForm/>
        </div>
      );
  }
});

var CommentList = React.createClass({
  render: function() {
      var commentNodes = this.props.data.map(function (comment){
        return (
          <Comment author={comment.author} key={comment.id}>
            {comment.comment}
          </Comment>
        )
      })
      return (
        <div className='commentList'>
          {commentNodes}
        </div>
      );
  }
});

var data = [
  {id: 1, author: 'Leonan Teixeira', comment: 'This is one comment'},
  {id: 2, author: 'João da Silva', comment: 'This is *another* comment'}
]

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className='commentForm'>
        Hello, Word! I am a CommentForm.
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function(){
    return (
      <div className='comment'>
        <h2 className='commentAuthor'>{this.props.author}</h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
});

ReactDOM.render(<CommentBox data={data}/>, document.getElementById('content'))
