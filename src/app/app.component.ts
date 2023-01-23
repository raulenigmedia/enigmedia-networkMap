import {AfterViewInit, Component} from '@angular/core';
import * as cytoscape from 'cytoscape';
import * as $ from 'jquery';
import * as popper from 'cytoscape-popper';
import * as cxtmenu from 'cytoscape-cxtmenu';
import * as edgehandles from 'cytoscape-edgehandles';
import * as contextMenus from 'cytoscape-context-menus';

cytoscape.use(popper);
cytoscape.use( cxtmenu );
cytoscape.use( edgehandles );
cytoscape.use(contextMenus);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  public userInteraction: boolean = true;
  public counter = 0;

  ngAfterViewInit() {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [
        {
          data: { id: 'node1', label: 'Industrial device 1', info: 'Información adicional sobre el nodo 1'},
          position: { x: -100, y: -200 },
          style: {
            'background-image': 'url("assets/img/laptop.png")',
            'text-valign': 'bottom',
            'font-size': '7px',
            'color':'white',
            'text-margin-y': '5px'
          }},
        {
          data: { id: 'node2', label: 'Industrial device' },
          position: { x: 100, y: 200 },
          style: {
            'background-image': 'url("assets/img/laptop.png")',
            'text-valign': 'bottom',
            'font-size': '7px',
            'color':'white',
            'text-margin-y': '5px'
          }
          },
        {
          data: { id: 'node3', label: 'Industrial device' },
          position: { x: 0, y: 200 },
          style: {
            'background-image': 'url("assets/img/industrial-device.png")',
            'text-valign': 'bottom',
            'font-size': '7px',
            'color':'white',
            'text-margin-y': '5px'
          } },
        {
          data: { id: 'node4', label: 'Industrial device' },
          position: { x: 0, y: -200 },
          style: {
            'background-image': 'url("assets/img/industrial-device.png")',
            'text-valign': 'bottom',
            'font-size': '7px',
            'color':'white',
            'text-margin-y': '5px'
          } },
        {
          data: { id: 'master', label: 'Master' },
          position: { x: 0, y: 0 },
          style: { 'background-color': '#BA68C8', 'text-valign': 'center', 'width': '100px', 'height': '100px', 'border-color': 'white', 'border-width':'2px'} },
        {
          data: { id: 'master2', label: 'Master 2' },
          position: { x: 400, y: 0 },
          style: {
          'background-color': '#BA68C8', 'text-valign': 'center', 'width': '100px', 'height': '100px', 'border-color': 'white', 'border-width':'2px'
          } },
        {
          data: { source: 'node1', target: 'master' },
          style: {
            'line-style': 'dashed',
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'target-arrow-fill': 'filled',
            'width': 1,
          } },
        {
          data: { source: 'node2', target: 'master' },
          style: {
            'line-style': 'solid',
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'target-arrow-fill': 'filled',
            'width': 1,
          }},
        {
          data: { source: 'node3', target: 'master' },
          style: {
            'line-style': 'dashed',
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'target-arrow-fill': 'filled',
            'width': 1,
          } },
        {
          data: { source: 'node4', target: 'master'},
          style: {
            'line-style': 'solid',
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'target-arrow-fill': 'filled',
            'width': 1,
          }},
        { data: { source: 'master2', target: 'master', id: 'edge-master' }, style: {
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'line-color': '#BA68C8',
            'line-opacity':0.3,
            'width': 50
          } },
      ],
      style: [
        {
          selector: 'edge-master',
          style: {
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'line-color': '#BA68C8',
            'line-opacity':0.3,
            'width': 50
          },
        },
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(label)'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          selector: 'cy',
          style: {
            'background-color': '#17212f'
          }
        }
      ],
      layout: {
        name: 'preset'
      },
      userZoomingEnabled: this.userInteraction,
      boxSelectionEnabled: this.userInteraction,
    });
    cy.selectionType( 'additive' );

    cy.elements().unbind('mouseover');
    cy.elements().bind('mouseover', (event) => event.target.tippy.show());

    cy.elements().unbind('mouseout');
    cy.elements().bind('mouseout', (event) => event.target.tippy.hide());


    // the default values of each option are outlined below:
    // let defaults = {
    //   menuRadius: function(){ return 100; }, // the outer radius (node center to the end of the menu) in pixels. It is added to the rendered size of the node. Can either be a number or function as in the example.
    //   selector: 'node:tap', // elements matching this Cytoscape.js selector will trigger cxtmenus
    //   commands: [ // an array of commands to list in the menu or a function that returns the array
    //
    //     { // example command
    //       fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
    //       content: 'Remove node', // html/text content to be displayed in the menu
    //       contentStyle: {}, // css key:value pairs to set the command's css in js if you want
    //       select: function(ele: { id: () => any; }){ // a function to execute when the command is selected
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //         cy.getElementById(ele.id()).remove();
    //       },
    //       hover: function(ele: { id: () => any; }){ // a function to execute when the command is hovered
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //       },
    //       enabled: true // whether the command is selectable
    //     },
    //     { // example command
    //       fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
    //       content: 'Bookmark asset', // html/text content to be displayed in the menu
    //       contentStyle: {}, // css key:value pairs to set the command's css in js if you want
    //       select: function(ele: { id: () => any; }){ // a function to execute when the command is selected
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //       },
    //       hover: function(ele: { id: () => any; }){ // a function to execute when the command is hovered
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //       },
    //       enabled: true // whether the command is selectable
    //     },
    //     { // example command
    //       fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
    //       content: 'Show connected assets', // html/text content to be displayed in the menu
    //       contentStyle: {}, // css key:value pairs to set the command's css in js if you want
    //       select: function(ele: { id: () => any; }){ // a function to execute when the command is selected
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //       },
    //       hover: function(ele: { id: () => any; }){ // a function to execute when the command is hovered
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //       },
    //       enabled: true // whether the command is selectable
    //     }
    //
    //   ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
    //   fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
    //   activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
    //   activePadding: 20, // additional size in pixels for the active command
    //   indicatorSize: 24, // the size in pixels of the pointer to the active command, will default to the node size if the node size is smaller than the indicator size,
    //   separatorWidth: 3, // the empty spacing in pixels between successive commands
    //   spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
    //   adaptativeNodeSpotlightRadius: false, // specify whether the spotlight radius should adapt to the node size
    //   minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
    //   maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
    //   openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
    //   itemColor: 'white', // the colour of text in the command's content
    //   itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
    //   zIndex: 9999, // the z-index of the ui div
    //   atMouse: false, // draw menu at mouse position
    //   outsideMenuCancel: false // if set to a number, this will cancel the command if the pointer is released outside of the spotlight, padded by the number given
    // };
    // let defaultsEdge = {
    //   menuRadius: function(){ return 100; }, // the outer radius (node center to the end of the menu) in pixels. It is added to the rendered size of the node. Can either be a number or function as in the example.
    //   selector: 'edge:tap', // elements matching this Cytoscape.js selector will trigger cxtmenus
    //   commands: [ // an array of commands to list in the menu or a function that returns the array
    //
    //     { // example command
    //       fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
    //       content: 'Remove connection', // html/text content to be displayed in the menu
    //       contentStyle: {}, // css key:value pairs to set the command's css in js if you want
    //       select: function(ele: { source: () => any; target:() => any }){ // a function to execute when the command is selected
    //         console.log( ele.source().id() )
    //         console.log( ele.target().id() )
    //         let edge = cy.edges().filter(e => e.source().id() === ele.source().id() && e.target().id() === ele.target().id());
    //         edge.remove();
    //       },
    //       hover: function(ele: { id: () => any; }){ // a function to execute when the command is hovered
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //       },
    //       enabled: true // whether the command is selectable
    //     },
    //
    //     { // example command
    //       fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
    //       content: 'Other options', // html/text content to be displayed in the menu
    //       contentStyle: {}, // css key:value pairs to set the command's css in js if you want
    //       select: function(ele: { id: () => any; }){ // a function to execute when the command is selected
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //       },
    //       hover: function(ele: { id: () => any; }){ // a function to execute when the command is hovered
    //         console.log( ele.id() ) // `ele` holds the reference to the active element
    //       },
    //       enabled: true // whether the command is selectable
    //     }
    //
    //   ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
    //   fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
    //   activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
    //   activePadding: 20, // additional size in pixels for the active command
    //   indicatorSize: 24, // the size in pixels of the pointer to the active command, will default to the node size if the node size is smaller than the indicator size,
    //   separatorWidth: 3, // the empty spacing in pixels between successive commands
    //   spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
    //   adaptativeNodeSpotlightRadius: false, // specify whether the spotlight radius should adapt to the node size
    //   minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
    //   maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
    //   openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
    //   itemColor: 'white', // the colour of text in the command's content
    //   itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
    //   zIndex: 9999, // the z-index of the ui div
    //   atMouse: false, // draw menu at mouse position
    //   outsideMenuCancel: false // if set to a number, this will cancel the command if the pointer is released outside of the spotlight, padded by the number given
    // };
    //
    // // @ts-ignore
    // let menu = cy.cxtmenu( defaults );
    //
    // // @ts-ignore
    // cy.cxtmenu(defaultsEdge);

    var optMenu = {
      // Customize event to bring up the context menu
      // Possible options https://js.cytoscape.org/#events/user-input-device-events
      evtType: 'cxttap',
      // List of initial menu items
      // A menu item must have either onClickFunction or submenu or both
      menuItems: [
      {
        id: 'remove', // ID of menu item
        content: 'remove', // Display content of menu item
        tooltipText: 'remove', // Tooltip text for menu item
        //image: {src : "remove.svg", width : 12, height : 12, x : 6, y : 4}, // menu icon
        // Filters the elements to have this menu item on cxttap
        // If the selector is not truthy no elements will have this menu item on cxttap
        selector: 'node, edge',
        onClickFunction: function () { // The function to be executed on click
          console.log('remove element');
        },
        disabled: false, // Whether the item will be created as disabled
        show: true, // Whether the item will be shown or not
        hasTrailingDivider: true, // Whether the item will have a trailing divider
        coreAsWell: false, // Whether core instance have this item on cxttap
        submenu: [
          {
            id: 'remove', // ID of menu item
            content: 'remove', // Display content of menu item
            tooltipText: 'remove', // Tooltip text for menu item
            //image: {src : "remove.svg", width : 12, height : 12, x : 6, y : 4}, // menu icon
            // Filters the elements to have this menu item on cxttap
            // If the selector is not truthy no elements will have this menu item on cxttap
            selector: 'node, edge',
            onClickFunction: function () { // The function to be executed on click
              console.log('remove element');
            },
            disabled: false, // Whether the item will be created as disabled
            show: true, // Whether the item will be shown or not
            hasTrailingDivider: true, // Whether the item will have a trailing divider
            coreAsWell: false, // Whether core instance have this item on cxttap
            submenu: [] // Shows the listed menuItems as a submenu for this item. An item must have either submenu or onClickFunction or both.
          }
        ] // Shows the listed menuItems as a submenu for this item. An item must have either submenu or onClickFunction or both.
      },
      {
        id: 'hide',
        content: 'hide',
        tooltipText: 'hide',
        selector: 'node, edge',
        onClickFunction: function () {
          console.log('hide element');
        },
        //disabled: true
      },
      {
        id: 'add-node',
        content: 'add node',
        tooltipText: 'add node',
        image: {src : "assets/img/laptop.png", width : 12, height : 12, x : 6, y : 4},
        selector: 'node',
        coreAsWell: true,
        onClickFunction: function () {
          console.log('add node');
        }
      }
      ],
      menuItemClasses: ["custom-menu-item", "custom-menu-item:hover"],
      contextMenuClasses: ["custom-context-menu"],
      // Indicates that the menu item has a submenu. If not provided default one will be used
      submenuIndicator: { src: 'assets/submenu-indicator-default.svg', width: 12, height: 12 }
    };

    // @ts-ignore
    var instance = cy.contextMenus(optMenu);


    // @ts-ignore
    document.getElementById("zoomIn").addEventListener("click", function(){
      const zoomLevel = cy.zoom() + 0.1;
      cy.zoom(zoomLevel);
    });
    // @ts-ignore
    document.getElementById("zoomOut").addEventListener("click", function(){
      const zoomLevel = cy.zoom() - 0.1;
      cy.zoom(zoomLevel);
    });
    // @ts-ignore
    document.getElementById("deleteSelected").addEventListener("click", function(){
      var selectedNodes = cy.$(':selected');
      console.log(selectedNodes);
      selectedNodes.forEach(function(node){
        console.log( node.id() ) // `ele` holds the reference to the active element
        cy.getElementById(node.id()).remove();
      });
    });
    // @ts-ignore
    document.getElementById("allow").addEventListener("click", function(){
      console.log('enable');
      const nodes = cy.nodes();
      nodes.forEach(node => {
        console.log(node);
        node.unlock();
        console.log(node.locked());
      });
    });
    // @ts-ignore
    document.getElementById("disable").addEventListener("click", function(){
      console.log('disable');
      const nodes = cy.nodes();
      nodes.forEach(node => {
        console.log(node);
        node.lock();
        console.log(node.locked());
      });
    });
    // @ts-ignore
    document.getElementById("addNode").addEventListener("click", function(){
      const min = 1;
      const max = 10000000;
      const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      cy.add({
        data: { id: 'node' + randomNumber, label: 'Industrial device' },
        position: { x: 400, y: 100 },
        style: {
          'background-image': 'url("assets/img/laptop.png")',
          'text-valign': 'bottom',
          'font-size': '7px',
          'color':'white',
          'text-margin-y': '5px'
        }
      });
      cy.add({
        data: { source: 'node' + randomNumber, target: 'master2'},
        style: {
          'line-style': 'solid',
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'target-arrow-fill': 'filled',
          'width': 1,
        }});

    });
    // @ts-ignore
    document.getElementById("addMany").addEventListener("click", function(){
      for(let i=0; i<100; i++){
        const min = 1;
        const max = 10000000;
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        cy.add({
          data: { id: 'node' + randomNumber, label: 'Industrial device' },
          position: { x: 400, y: 100 + i*20 },
          style: {
            'background-image': 'url("assets/img/laptop.png")',
            'text-valign': 'bottom',
            'font-size': '7px',
            'color':'white',
            'text-margin-y': '5px'
          }
        });
        cy.add({
          data: { source: 'node' + randomNumber, target: 'master2'},
          style: {
            'line-style': 'solid',
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'target-arrow-fill': 'filled',
            'width': 1,
          }});
      }
      cy.layout({
        name: 'random'
      }).run();

    });
    // @ts-ignore
    document.getElementById("export").addEventListener("click", () => {
      const blob = this.base64ToBlob(cy.png());
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'nombre-del-archivo';
      link.href = blobUrl;
      link.click();
      URL.revokeObjectURL(blobUrl);

    });
    cy.on('tap', 'node', function(event){
      var node = event.target;
      console.log(node.id());

      var selectedNodes = cy.$(':selected');
      var found = false;
      selectedNodes.forEach(function(node1){
        if(node1.id() == node.id()){
          node1.style('background-color', 'lightgrey');
          found = true;
        }
      });
      if(!found){
        node.style('background-color', 'red');
      }
    });


    let defaults2 = {
      canConnect: function( sourceNode: { same: (arg0: any) => any; }, targetNode: any ){
        // whether an edge can be created between source and target
        return !sourceNode.same(targetNode); // e.g. disallow loops
      },
      edgeParams: function( sourceNode: any, targetNode: any ){
        console.log(sourceNode, targetNode);
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for edge
        return {};
      },
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
      snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
      snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
      noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
      disableBrowserGestures: true // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
    };

    // // @ts-ignore
    // let eh = cy.edgehandles( defaults2 );
    // cy.edgehandles().enable();
    // cy.edgehandles().enableDrawMode();
    //
    // // @ts-ignore
    // document.getElementById("allowDraw").addEventListener("click", function(){
    //   console.log('allow draw');
    //   cy.edgehandles().enable();
    //   cy.edgehandles().enableDrawMode();
    // });
    //
    // // @ts-ignore
    // document.getElementById("disableDraw").addEventListener("click", function(){
    //   console.log('disable draw');
    //   cy.edgehandles().disable();
    //   cy.edgehandles().disableDrawMode();
    // });


  }

  private base64ToBlob(base64uri: string): Blob {
    const byteString = atob(base64uri.split(',')[1]);
    const mimeString = base64uri.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

}
