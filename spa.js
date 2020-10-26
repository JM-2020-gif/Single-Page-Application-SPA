
const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

if(window.localStorage.getItem("coursesDo") == undefined){
     var coursesDo = [];
     window.localStorage.setItem("coursesDo", JSON.stringify(coursesDo));
}

var coursesDoEX = window.localStorage.getItem("coursesDo");
var coursesDo = JSON.parse(coursesDoEX);


class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "EDIT";
    	edit.addEventListener('click', () => this.edit(input, name));

    	var remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "REMOVE";
    	remove.addEventListener('click', () => this.remove(itemBox, name));

    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = coursesDo.indexOf(name);
            coursesDo[indexof] = input.value;
            window.localStorage.setItem("coursesDo", JSON.stringify(coursesDo));
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = coursesDo.indexOf(name);
        coursesDo.splice(index, 1);
        window.localStorage.setItem("coursesDo", JSON.stringify(coursesDo));
    }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        coursesDo.push(inputValue.value);
        window.localStorage.setItem("coursesDo", JSON.stringify(coursesDo));
		inputValue.value = "";
	}
}


for (var v = 0 ; v < coursesDo.length ; v++){
    new item(coursesDo[v]);
}
new item("sport");

//SPA single page Application
const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })
        
        document.querySelectorAll('.nav-link').forEach((linkItem)=>{
            linkItem.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'Courses', '#toDo');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    }, 
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');


    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);   
    }   
}
document.addEventListener('DOMContentLoaded', app.init);

const doList = document.querySelector(".doList");

const toDo = [];


