function Node (data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = function () {
        return this.data;
    }
}
// binary search tree
function BST() {
    var that = this;
    this.root = null;
    this.insert = function (data) {
        var n = new Node(data, null, null);
        if (this.root == null) {
            this.root = n;
        } else {
            var current = this.root;
            var parent;
            while (true) {
                parent = current;
                if (data < current.data) {
                    current = current.left;
                    if (current == null) {
                        parent.left = n;
                        break;
                    }
                } else {
                    current = current.right;
                    if (current == null) {
                        parent.right = n;
                        break;
                    }
                }
            }
        }
        return that;
    }
    this.inOrder = function (node) {
        if (!(node == null) ) {
            that.inOrder(node.left);
            put(node.show() + " ");
            that.inOrder(node.right);
        }
        return that;
    };
    this.preOrder = function (node) {
        if (!(node == null)) {
            put(node.show() + " ");
            preOrder(node.left);
            preOrder(node.right);
        }
    };
    this.postOrder = function (node) {
        if (!(node == null)) {
            postOrder(node.left);
            postOrder(node.right);
            put(node.show() + " ");
        }
    };
    this.getMin = function () {
        var current = that.root;
        while (!(current.left == null)) {
            current = current.left;
        }
        return current.data;
    };
    this.getMax = function () {
        var current = this.root;
        while (!(current.right == null)) {
            current = current.right;
        }
        return current.data;
    };
    this.find = function () {
        var current = this.root;
        while (current != null) {
            if (current.data == data) {
                return current;
            } else if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    };
}

function put (str) {
    console.log(str);
}