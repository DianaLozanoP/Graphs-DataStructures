class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.addVertex(node)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex)
      }
      if (node === vertex) {
        this.nodes.delete(node)
      }
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let finalArray = []
    let Stack = [start];

    let seen = new Set(Stack);
    while (Stack.length) {
      let currentNode = Stack.pop();

      finalArray.push(currentNode.value)

      for (let neighbor of currentNode.adjacent) {
        if (!seen.has(neighbor)) {
          Stack.push(neighbor)
          seen.add(neighbor)
        }
      }
    }
    return finalArray;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let finalArray = []
    let Queue = [start];
    let seen = new Set(Queue)
    while (Queue.length) {
      let currentNode = Queue.shift();

      finalArray.push(currentNode.value)

      for (let neighbor of currentNode.adjacent) {
        if (!seen.has(neighbor)) {
          Queue.push(neighbor)
          seen.add(neighbor)
        }
      }
    }
    return finalArray;
  }
}

module.exports = { Graph, Node }