var idx = lunr(function () {
  this.field('title')
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')

  
  
    
    
      this.add({
          title: "如何在 Atom 和 WebStorm 上配置 React Native 的代码编辑环境",
          excerpt: "针对 React Native 的项目，这里主要介绍什么是 Eslint 和 Flow ，以及在 Atom 和 WebStorm 上如何配置它们。 Eslint Eslint 作为静态代码检查工具，在团队代码中可以起到统一代码风格的作用，同时会适当降低代码编写过程中出现的一些非必要性错误。 ESLint 官方网站上的介绍： JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript...",
          categories: ["React-Native"],
          tags: ["React-Native","React","javascript"],
          id: 0
      })
      
    
  
});

console.log( jQuery.type(idx) );

var store = [
  
    
    
    
      
      {
        "title": "如何在 Atom 和 WebStorm 上配置 React Native 的代码编辑环境",
        "url": "/react-native/2018/01/02/config-react-native-at-Atom-and-WebStorm.html",
        "excerpt": "针对 React Native 的项目，这里主要介绍什么是 Eslint 和 Flow ，以及在 Atom 和 WebStorm 上如何配置它们。 Eslint Eslint 作为静态代码检查工具，在团队代码中可以起到统一代码风格的作用，同时会适当降低代码编写过程中出现的一些非必要性错误。 ESLint 官方网站上的介绍： JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript...",
        "teaser":
          
            null
          
      }
    
  ]

$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    var query = $(this).val().toLowerCase().replace(":", "");
    var result =
      idx.query(function (q) {
        query.split(lunr.tokenizer.separator).forEach(function (term) {
          q.term(term, {  boost: 100 })
          if(query.lastIndexOf(" ") != query.length-1){
            q.term(term, {  usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })
          }
          if (term != ""){
            q.term(term, {  usePipeline: false, editDistance: 1, boost: 1 })
          }
        })
      });
    resultdiv.empty();
    resultdiv.prepend('<p class="results__found">'+result.length+' Result(s) found</p>');
    for (var item in result) {
      var ref = result[item].ref;
      if(store[ref].teaser){
        var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<div class="archive__item-teaser">'+
                '<img src="'+store[ref].teaser+'" alt="">'+
              '</div>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      else{
    	  var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  });
});
