// https://github.com/jekyll/jekyll/blob/7f578b5dd88653583bdf3ad5ff703a6ee5d91b95/site/_includes/anchor_links.html
var anchorForId = function (id) {
  var anchor = document.createElement('a');
  anchor.className = 'heading-link';
  anchor.href = '#' + id;
  anchor.innerHTML =
    '<span class="sr-only">Permalink</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></span>';
  anchor.title = 'Permalink';
  return anchor;
};

var linkifyAnchors = function (level, containingElement) {
  var headers = containingElement.getElementsByTagName('h' + level);
  for (var h = 0; h < headers.length; h++) {
    var header = headers[h];
    if (typeof header.id !== 'undefined' && header.id !== '') {
      header.appendChild(anchorForId(header.id));
    }
  }
};

window.addEventListener('DOMContentLoaded', function () {
  var contentBlock = document.getElementsByTagName('main')[0];
  if (!contentBlock) {
    return;
  }
  for (var level = 1; level <= 6; level++) {
    linkifyAnchors(level, contentBlock);
  }
});
