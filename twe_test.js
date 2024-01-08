

(function(Scratch) {
    'use strict'

    class MyExtension {
        getInfo() {
            return {
                id: 'exampleextension',
                name: 'Example Extension',
                color1: '#ff4242',
                color2: '#df2d2d',
                blocks: [
                    /*
                    Block types are:
                    REPORTER
                    BOOLEAN
                    COMMAND

                    Argument types are:
                    STRING 
                    NUMBER
                    BOOLEAN
                    ANGLE
                    COLOR
                    MATRIX (5x5)
                    NOTE
                    */
                    
                    {
                        opcode: 'trueblock',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'true'
                    },

                    {
                        opcode: 'falseblock',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'false'
                    },

                    {
                        opcode: 'helloworld',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Hello, world!'
                    },

                    {
                        opcode: 'alertblock',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'alert [X]',
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello!'
                            }
                        }
                    },

                    {
                        opcode: 'setstagesize',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set stage size to [WIDTH] x [HEIGHT]',
                        arguments: {
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 480
                            },
                            HEIGHT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 360
                            }
                        }
                    },

                    {
                        opcode: 'stagewidth',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'stage width'
                    },

                    {
                        opcode: 'stageheight',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'stage height'
                    },

                    {
                        opcode: 'copytoclipboard',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'copy [TEXT] to clipboard',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'bananas are cool!'
                            }
                        }
                    },

                    {
                        opcode: 'canreadclipboard',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'can read clipboard?'
                    },

                    {
                        opcode: 'readclipboard',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'clipboard'
                    },

                    {
                        opcode: 'strictequals',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'does [A] exactly equal [B]?',
                        arguments: {
                            A: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            B: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Apple'
                            }
                        }
                    },
                    
                    {
                        opcode: 'typeof',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'type of [A]',
                        arguments: {
                            A: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                        }
                    },

                    {
                        opcode: 'fittoboolean',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[A]',
                        arguments: {
                            A: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1'
                            }
                        }
                    },
                    
                    {
                        opcode: 'runjavascript',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'run javascript [CODE]',
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "alert('hello')"
                            }
                        }
                    },
                ]
            }
        }

        helloworld() {
            return 'Hello world!'
        }

        alertblock(args) {
            alert(args.X)
        }

        setstagesize(args) {
            var width = parseInt(args.WIDTH, 10)
            var height = parseInt(args.HEIGHT, 10)


            if (typeof width != 'number' || isNaN(width)) return console.error('the stage width should be a finite number')
            if (typeof height != 'number' || isNaN(height)) return console.error('the stage height should be a finite number')

            if (width <= 0) return console.error('the stage width should be above 0')
            if (height <= 0) return console.error('the stage height should be above 0')

            vm.setStageSize(width, height)

            // if (typeof args.WIDTH == 'number' && typeof args.HEIGHT == 'number') {

            //     if (args.WIDTH > 0 && args.HEIGHT > 0) {
            //         vm.setStageSize(args.WIDTH, args.HEIGHT)
            //     }

            // }

        }

        trueblock() {
            return true
        }

        falseblock() {
            return false
        }

        stagewidth() {
            return vm.runtime.stageWidth
        }

        stageheight() {
            return vm.runtime.stageHeight
        }

        async copytoclipboard(args) {
            navigator.clipboard.writeText(args.TEXT).then(
                () => { // success
                    // console.log('success')
                },
                () => { // failure
                    console.log('Can\'t read clipboard')
                }
            )
        }

        async canreadclipboard() {
            const txt = await navigator.clipboard.readText().catch((error) => {
                return false
            })
            
            //txt is false for some reason if it can't read the clipboard
            if(txt == false) {
                return false
            } else {
                return true
            }
        }

        async readclipboard() {
            // const permissionStatus = await navigator.permissions.query({
            //     name: 'clipboard-read', allowWithoutGesture: false
            // });

            // if (permissionStatus.state != 'granted') {
            //     //console.log('permission status is: ', permissionStatus)
            //     return ''
            // }

            const txt = await navigator.clipboard.readText().catch((error) => {
                return ''
            })

            return txt
        }

        runjavascript(args) {
            var J = new Function(args.CODE)
            J()
        }

        strictequals(args) {
            return args.A === args.B
        }

        typeof(args) {
            return typeof args.A
        }

        fittoboolean(args) {
            return args.A
        }
    }

    Scratch.extensions.register(new MyExtension())

})(Scratch)


//Thanks Stack Overflow!
function copyTextToClipboard(text) {
    // var textArea = document.createElement("textarea");

    // textArea.style.position = 'fixed';
    // textArea.style.top = 0;
    // textArea.style.left = 0;

    // textArea.style.width = '2em';
    // textArea.style.height = '2em';

    // textArea.style.padding = 0;

    // textArea.style.border = 'none';
    // textArea.style.outline = 'none';
    // textArea.style.boxShadow = 'none';

    // textArea.style.background = 'transparent';

    // textArea.value = text;

    // document.body.appendChild(textArea);
    // textArea.focus();
    // textArea.select();

    // try {
    //     document.execCommand('copy');
    // } catch (err) {
    //     console.error('Unable to copy text.');
    // }

    // document.body.removeChild(textArea);
}