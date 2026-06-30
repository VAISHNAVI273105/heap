// ===============================
// DOM ELEMENTS
// ===============================

const svg = document.getElementById("heapCanvas");

const heapType = document.getElementById("heapType");

const insertInput = document.getElementById("insertValue");

const deleteInput = document.getElementById("deleteValue");

const arrayContainer = document.getElementById("arrayContainer");

const historyList = document.getElementById("history");

const statusBox = document.getElementById("status");

const heapSize = document.getElementById("heapSize");

const heapHeight = document.getElementById("heapHeight");

const rootValue = document.getElementById("rootValue");


// ===============================
// BUTTONS
// ===============================

const insertBtn = document.getElementById("insertBtn");

const deleteBtn = document.getElementById("deleteBtn");

const deleteRootBtn = document.getElementById("deleteRootBtn");

const peekBtn = document.getElementById("peekBtn");

const clearBtn = document.getElementById("clearBtn");

const buildHeapBtn = document.getElementById("buildHeapBtn");

const heapSortBtn = document.getElementById("heapSortBtn");


// ===============================
// SVG SETTINGS
// ===============================

const SVG_WIDTH = 1200;

const SVG_HEIGHT = 650;

const NODE_RADIUS = 25;

const LEVEL_HEIGHT = 110;


// ===============================
// HEAP CLASS
// ===============================

class Heap{

    constructor(type="max"){

        this.heap=[];

        this.type=type;

    }

    setType(type){

        this.type=type;

        this.rebuild();

    }

    compare(a,b){

        if(this.type==="max"){

            return a>b;

        }

        return a<b;

    }

    parent(i){

        return Math.floor((i-1)/2);

    }

    left(i){

        return 2*i+1;

    }

    right(i){

        return 2*i+2;

    }

    swap(i,j){

        [this.heap[i],this.heap[j]]=[this.heap[j],this.heap[i]];
    }

}
// ===============================
// STATUS
// ===============================

function setStatus(text){

    statusBox.innerText=text;

}

// ===============================
// HISTORY
// ===============================

function addHistory(text){

    const li=document.createElement("li");

    li.innerText=text;

    historyList.prepend(li);

}

// ===============================
// ARRAY VIEW
// ===============================

function updateArray(){

    arrayContainer.innerHTML="";

    heap.heap.forEach(value=>{

        const box=document.createElement("div");

        box.className="array-box";

        box.innerText=value;

        arrayContainer.appendChild(box);

    });

}

// ===============================
// STATISTICS
// ===============================

function updateStats(){

    heapSize.innerText=heap.heap.length;

    if(heap.heap.length===0){

        heapHeight.innerText=0;

        rootValue.innerText="-";

    }

    else{

        heapHeight.innerText=

        Math.floor(

        Math.log2(heap.heap.length)

        )+1;

        rootValue.innerText=heap.heap[0];

    }

}
// ===============================
// CREATE HEAP
// ===============================

const heap=new Heap("max");
// ===============================
// EVENTS
// ===============================

heapType.addEventListener("change",()=>{

    heap.setType(heapType.value);

    drawHeap();

});

insertBtn.addEventListener("click",insert);

deleteBtn.addEventListener("click",deleteValue);

deleteRootBtn.addEventListener("click",deleteRoot);

peekBtn.addEventListener("click",peek);

clearBtn.addEventListener("click",clearHeap);

buildHeapBtn.addEventListener("click",buildHeap);

heapSortBtn.addEventListener("click",heapSort);
// ===============================
// PLACEHOLDERS
// ===============================

function insert(){}

function deleteRoot(){}

function deleteValue(){}

function peek(){}

function clearHeap(){}

function buildHeap(){}

function heapSort(){}

function drawHeap(){}
// ==========================================
// INSERT ELEMENT
// ==========================================

function insert(){

    const value = Number(insertInput.value);

    if(insertInput.value === ""){

        setStatus("Please enter a number.");

        return;

    }

    heap.heap.push(value);

    heapifyUp(heap.heap.length - 1);

    insertInput.value = "";

    addHistory("Inserted " + value);

    setStatus(value + " inserted successfully.");

    refresh();

}
// ==========================================
// HEAPIFY UP
// ==========================================

function heapifyUp(index){

    while(index > 0){

        let parent = heap.parent(index);

        if(heap.compare(heap.heap[index], heap.heap[parent])){

            heap.swap(index, parent);

            index = parent;

        }

        else{

            break;

        }

    }

}
// ==========================================
// REBUILD HEAP
// Used when changing Heap Type
// ==========================================

Heap.prototype.rebuild = function(){

    let values = [...this.heap];

    this.heap = [];

    for(let value of values){

        this.heap.push(value);

        heapifyUp(this.heap.length - 1);

    }

};
// ==========================================
// REFRESH UI
// ==========================================

function refresh(){

    updateArray();

    updateStats();

    drawHeap();

}
insertInput.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        insert();

    }

});

deleteInput.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        deleteValue();

    }

});
// ==========================================
// DELETE ROOT
// ==========================================

function deleteRoot(){

    if(heap.heap.length===0){

        setStatus("Heap is Empty");

        return;

    }

    let removed = heap.heap[0];

    if(heap.heap.length===1){

        heap.heap.pop();

    }

    else{

        heap.heap[0] = heap.heap.pop();

        heapifyDown(0);

    }

    addHistory("Deleted Root : " + removed);

    setStatus("Root Deleted");

    refresh();

}
// ==========================================
// HEAPIFY DOWN
// ==========================================

function heapifyDown(index){

    while(true){

        let left = heap.left(index);

        let right = heap.right(index);

        let target = index;

        if(

            left < heap.heap.length &&

            heap.compare(

                heap.heap[left],

                heap.heap[target]

            )

        ){

            target = left;

        }

        if(

            right < heap.heap.length &&

            heap.compare(

                heap.heap[right],

                heap.heap[target]

            )

        ){

            target = right;

        }

        if(target === index){

            break;

        }

        heap.swap(index,target);

        index = target;

    }

}
// ==========================================
// DELETE PARTICULAR VALUE
// ==========================================

function deleteValue(){

    const value = Number(deleteInput.value);

    if(deleteInput.value===""){

        setStatus("Enter a value.");

        return;

    }

    const index = heap.heap.indexOf(value);

    if(index===-1){

        setStatus("Value not found.");

        return;

    }

    if(index===heap.heap.length-1){

        heap.heap.pop();

    }

    else{

        heap.heap[index]=heap.heap.pop();

        heapifyDown(index);

        heapifyUp(index);

    }

    deleteInput.value="";

    addHistory("Deleted " + value);

    setStatus(value + " deleted.");

    refresh();

}
// ==========================================
// PEEK
// ==========================================

function peek(){

    if(heap.heap.length===0){

        setStatus("Heap is Empty");

        return;

    }

    setStatus(

        "Root Element : " +

        heap.heap[0]

    );

}
// ==========================================
// CLEAR HEAP
// ==========================================

function clearHeap(){

    heap.heap=[];

    historyList.innerHTML="";

    setStatus("Heap Cleared");

    refresh();

}
// ==========================================
// BUILD HEAP
// ==========================================

function buildHeap(){

    heap.rebuild();

    addHistory("Heap Rebuilt");

    setStatus("Heap Built Successfully");

    refresh();

}
// ==========================================
// HEAP SORT
// ==========================================

function heapSort(){

    setStatus(

        "Heap Sort Visualization Coming in Part 6"

    );

}
// ======================================
// CLEAR SVG
// ======================================

function clearSVG(){

    while(svg.firstChild){

        svg.removeChild(svg.firstChild);

    }

}
// ======================================
// CALCULATE NODE POSITION
// ======================================

function getNodePosition(index){

    const level = Math.floor(Math.log2(index + 1));

    const firstNode = Math.pow(2, level) - 1;

    const position = index - firstNode;

    const nodesInLevel = Math.pow(2, level);

    const gap = SVG_WIDTH / (nodesInLevel + 1);

    const x = gap * (position + 1);

    const y = 80 + level * LEVEL_HEIGHT;

    return { x, y };

}
// ======================================
// DRAW EDGE
// ======================================

function drawLine(x1,y1,x2,y2){

    const line = document.createElementNS(

        "http://www.w3.org/2000/svg",

        "line"

    );

    line.setAttribute("x1",x1);

    line.setAttribute("y1",y1);

    line.setAttribute("x2",x2);

    line.setAttribute("y2",y2);

    line.setAttribute("class","edge");

    svg.appendChild(line);

}
// ======================================
// DRAW NODE
// ======================================

function drawNode(x,y,value){

    const circle = document.createElementNS(

        "http://www.w3.org/2000/svg",

        "circle"

    );

    circle.setAttribute("cx",x);

    circle.setAttribute("cy",y);

    circle.setAttribute("r",NODE_RADIUS);

    circle.setAttribute("class","node");

    svg.appendChild(circle);

    const text = document.createElementNS(

        "http://www.w3.org/2000/svg",

        "text"

    );

    text.setAttribute("x",x);

    text.setAttribute("y",y+2);

    text.setAttribute("class","node-text");

    text.textContent=value;

    svg.appendChild(text);

}
// ======================================
// DRAW HEAP
// ======================================

function drawHeap(){

    clearSVG();

    if(heap.heap.length===0){

        return;

    }

    // Draw Parent-Child Lines

    for(let i=0;i<heap.heap.length;i++){

        const parent=getNodePosition(i);

        const left=heap.left(i);

        const right=heap.right(i);

        if(left<heap.heap.length){

            const child=getNodePosition(left);

            drawLine(

                parent.x,

                parent.y,

                child.x,

                child.y

            );

        }

        if(right<heap.heap.length){

            const child=getNodePosition(right);

            drawLine(

                parent.x,

                parent.y,

                child.x,

                child.y

            );

        }

    }

    // Draw Nodes

    for(let i=0;i<heap.heap.length;i++){

        const pos=getNodePosition(i);

        drawNode(

            pos.x,

            pos.y,

            heap.heap[i]

        );

    }

}
refresh();