import * as THREE from 'three'; // 3GS Library

export class World extends THREE.Mesh {
    #objectMap = new Map();

    constructor(width, height, depth) {
        super();

        // create class properties
        this.width = width;
        this.height = height;

        this.treeCount = 15;
        this.rockCount = 25;
        this.bushCount = 12;

        this.trees = new THREE.Group();
        this.add(this.trees);

        this.rocks = new THREE.Group();
        this.add(this.rocks);

        this.bushes = new THREE.Group();
        this.add(this.bushes);

        this.generate();
    };

    generate() {
        this.clear();
        this.createTrees();
        this.createTerrain();
        this.createRocks();
        this.createBushes();
    }

    clear() {
        if (this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }

        if (this.trees) {
            this.trees.children.forEach((tree) => {
                tree.geometry?.dispose();
                tree.material?.dispose();
            });
            this.trees.clear();
        };

        if (this.rocks) {
            this.rocks.children.forEach((rock) => {
                rock.geometry?.dispose();
                rock.material?.dispose();
            });
            this.rocks.clear();
        };

        if (this.bushes) {
            this.bushes.children.forEach((bushes) => {
                bushes.geometry?.dispose();
                bushes.material?.dispose();
            });
            this.bushes.clear();
        };

        this.#objectMap.clear();
    }

    createTerrain() {
        if (this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }
        const terrainMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x50a000,
            // wireframe: true,
        });
        const terrainGeometry = new THREE.PlaneGeometry(
            this.width, 
            this.height, 
            this.width, 
            this.height
        );

        this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
        this.terrain.rotation.x = -Math.PI / 2;
        // Remoce chancce of memory leaks by disposing old geometry
        // this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.terrain.position.set(this.width / 2, 0, this.height / 2);
        this.add(this.terrain);
    }

    createTrees() {
        const treeHeight = 3;
        const treeRadius = 0.25;

        const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
        const treeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x30510, 
            flatShading: true,
        });

        this.trees = new THREE.Group();
        this.add(this.trees);

        for (let i = 0; i < this.treeCount; i++) {
            const coords =  new THREE.Vector2(
                Math.floor(this.width * Math.random() / 1),
                Math.floor(this.height * Math.random() / 1),
            );

            // Don't place objects on top of each other
            if (this.#objectMap.has(`${coords.x} - ${coords.y}`)) continue;

            const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);

            const scale_y = Math.random();
            treeMesh.scale.y = scale_y;
            
            treeMesh.position.set(
               coords.x + 0.5,
               (treeHeight / 2) * scale_y,
               coords.y + 0.5,
            );

            this.trees.add(treeMesh);
            this.#objectMap.set(`${coords.x} - ${coords.y}`, treeMesh);
        };
    };

    createRocks() {
        const minRockRadius = 0.15;
        const maxRockRadius = 0.6;
        const minRockHeight = 0.05;
        const maxRockHeight = 0.25

        const rockMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xb0b0b0b0, 
            flatShading: true,
        });

        this.rocks = new THREE.Group();
        this.add(this.rocks);

        for (let i = 0; i < this.rockCount; i++) {
            // randomize the rock radius based on min and max raidus
            const radius = minRockRadius + (Math.random() * (maxRockRadius - minRockRadius));
            const height = minRockHeight + (Math.random() * (maxRockHeight - minRockHeight));
            
            const rockGeometry = new THREE.SphereGeometry(radius, 6, 5);
            const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);

            const coords =  new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random()),
            );

            // Don't place objects on top of each other
            if (this.#objectMap.has(`${coords.x} - ${coords.y}`)) continue;

            rockMesh.position.set(
                coords.x + 0.5,
                0,
                coords.y + 0.5,
            );

            rockMesh.scale.y = height / 2.0;
            this.rocks.add(rockMesh);

            this.#objectMap.set(`${coords.x} - ${coords.y}`, rockMesh);
        };
    };

    createBushes() {
        const minBushRadius = 0.15;
        const maxBushRadius = 0.6;
        const minBushHeight = 0.1;
        const maxBushHeight = 0.5;

        const bushMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x478546, 
            flatShading: true,
        });

        this.bushes = new THREE.Group();
        this.add(this.bushes);

        for (let i = 0; i < this.bushCount; i++) {
            // randomize the Bush radius based on min and max raidus
            const radius = minBushRadius + (Math.random() * (maxBushRadius - minBushRadius));
            // const height = minBushHeight + (Math.random() * (maxBushHeight - minBushHeight));
            const bushGeometry = new THREE.SphereGeometry(radius, 6, 6);
            const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);
            const coords =  new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random()),
            );

            // Don't place objects on top of each other
            if (this.#objectMap.has(`${coords.x} - ${coords.y}`)) continue;

            bushMesh.position.set(
                coords.x + 0.5,
                radius,
                coords.y + 0.5,
            );

            this.bushes.add(bushMesh);

            this.#objectMap.set(`${coords.x} - ${coords.y}`, bushMesh);
        };
    };
};

// Terrain
//   - Terrain Mesh
//   - Trees Group\
//       - Tree 1
//       - Tree 2
//       - Tree 3   
