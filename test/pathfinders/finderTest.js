describe('Finder', function() {
    it('should not be instantiable', function() {
        expect(() => new Finder(new Grid(5))).to.throw("Cannot construct abstract Finder instances directly");
    });

    it('should allow subclasses to be instantiable', function() {
        let sub = new AStar(new Grid(5), Heuristics.NONE);
        expect(sub).to.be.an.instanceof(Finder);
    });

    it('should force subclasses to implement findShortestPath()', function() {
        class Abuser extends Finder {
            constructor(...obs) {
                super(...obs);
            }
        }
        expect(() => new Abuser(new Grid(5), Heuristics.NONE)).to.throw('Classes extending the Finder must implement findShortestPath()');
    });

    it('should save given heuristic', function() {
        let size = 30;
        let sub = new AStar(new Grid(size), Heuristics.OCTILE);

        // Since Finder alters the heuristics for ties, I have hard coded this
        let n1 = new Node(1, 5);
        let n2 = new Node(24, 8);
        let n3 = new Node(0, 19);
        let n4 = new Node(26, 22);
        let p = size;
        let oct = (node, goal) => {
            let dx = Math.abs(node.x - goal.x);
            let dy = Math.abs(node.y - goal.y);
            return dx + dy + (SQRT2 - 2) * Math.min(dx, dy);
        }
        let h = (node, goal) => (oct(node, goal) * (1 + 1 / p));

        expect(sub.heuristic(n1, n2)).to.be.closeTo(h(n1, n2), 0.1);
        expect(sub.heuristic(n3, n4)).to.be.closeTo(h(n3, n4), 0.1);
    });

    it('should default to NONE-heursitic', function() {
        let sub = new AStar(new Grid(10));
        let n1 = new Node(1, 5);
        let n2 = new Node(24, 8);
        expect(sub.heuristic(n1, n2)).to.equal(0);
    })

    it('should give correct distances for neighbours', function() {
        let sub = new AStar(new Grid(10));
        let n1 = new Node(1, 5);
        let initGScore = 3;
        n1.gScore = initGScore;
        let n2 = new Node(2, 5);
        let n3 = new Node(2, 3);
        expect(sub._getDistance(n1, n2)).to.equal(1 + initGScore);
        expect(sub._getDistance(n1, n3)).to.be.closeTo(Math.sqrt(2) + initGScore, 0.001);
    })

    it('should backtrack correctly', function() {
        let sub = new AStar(new Grid(4));

        // Since Finder alters the heuristics for ties, I have hard coded this
        let n1 = new Node(1, 5);
        let n2 = new Node(24, 8);
        let n3 = new Node(0, 19);
        let n4 = new Node(26, 22);
        n1.parent = n2;
        n2.parent = n3;
        n3.parent = n4;
        let corr = new List();
        corr.push(n4);
        corr.push(n3);
        corr.push(n2);
        corr.push(n1);
        expect(sub._backtrack(n1).array).to.eql(corr.array);
    });
});