var CommentBox = React.createClass({
  render: function() {
      return (
        <div className='commentbox'>
          <h1>Comments</h1>
          <CommentList/>
          <CommentForm/>
        </div>
      );
  }
});

var CommentList = React.createClass({
  render: function() {
      return (
        <div className='commentList'>
          <Comment author='Leonan Teixeira'>This is one comment</Comment>
          <Comment author='João da Silva'>This is *another* comment</Comment>
        </div>
      );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className='commentForm'>
        Hello, Word! I am a CommentForm.
      </div>
    );
  }
})

var Comment = React.createClass({
  render: function(){
    return (
      <div className='comment'>
        <h2 className='commentAuthor'>{this.props.author}</h2>
      {this.props.children}
      </div>
    )
  }
});

ReactDOM.render(<CommentBox/>, document.getElementById('content'))
