import * as React from 'react';
import * as request from "superagent";

import { fabric } from "fabric";

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';
import { WebSettingProvider } from './WebSettingProvider';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });

class CoralRect {
  public x0: number;
  public x1: number;
  public y0: number;
  public y1: number;
}

export interface ICanvasManagerProps extends WithStyles<typeof styles> {
  setShouldSubmit?: (shouldSubmit: boolean) => void;
}

export interface ICanvasmanagerState {
  currCount: number;
}

export const CanvasManager = withStyles(styles)(
    class extends React.Component<ICanvasManagerProps, ICanvasmanagerState>{
      private flickrKey: string = "e813628d1745d2099f9ca002681b381b";
      private flickrSecret: string = "8e318755701e66f1";

      private imgObj: HTMLImageElement;
      private canvas: fabric.Canvas;

      constructor(props : ICanvasManagerProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          currCount: 0
        };
      }

      public componentDidMount()
      {
        // Setting up canvas and fetching requests
        var canvas = this.CreateHTMLCanvasByName("coralfinder");

        fabric.Object.prototype.set({
          transparentCorners: false,
          borderColor: "#FFBAE5",
          cornerColor: "#FFBAE5",
          perPixelTargetFind: true,
          borderScaleFactor: 1,
          cornerSize: 2,
          rotatingPointOffset: 6,
          originX: 'left',
          originY: 'top',
          // objectCaching: false
        });

        this.canvas = new fabric.Canvas(canvas, {
            backgroundColor: "#FFFFFF",
            // selectionColor : 'rgba(0,0,0,1)',
            selectionLineWidth : 5,
            enableRetinaScaling: false
        });
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onInvalid = this.onInvalid.bind(this);

        this.PreparingImageObj();
        this.FetchFlickrPhoto();

        var isDown = false;
          var origX = 0;
          var origY = 0;
          var rectangle = new fabric.Rect({
            left: origX,
            top: origY,
            fill: '',
            stroke: 'red',
            strokeWidth: 3,
        });

        var self = this;

        this.canvas.on('mouse:down', function(o){
          var pointer = self.canvas.getPointer(o.e);
      
          isDown = true;
          origX = pointer.x;
          origY = pointer.y;
      
          rectangle = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            fill: '',
            stroke: 'red',
            strokeWidth: 3,
          });

          self.canvas.remove.apply(self.canvas, self.canvas.getObjects().concat())
          self.canvas.add(rectangle);
        });

        this.canvas.on('mouse:move', function(o){
          if (!isDown) return;
          var pointer = self.canvas.getPointer(o.e);
          if(origX>pointer.x){
              rectangle.set({ left: Math.abs(pointer.x) });
          }
          if(origY>pointer.y){
              rectangle.set({ top: Math.abs(pointer.y) });
          }
      
          rectangle.set({ width: Math.abs(origX - pointer.x) });
          rectangle.set({ height: Math.abs(origY - pointer.y) });
          self.canvas.renderAll();
        });

        this.canvas.on('mouse:up', function(o){
          isDown = false;
          console.log(self.GetCurrentRectPosition())
        });
      }

      public onInvalid()
      {
        var self = this;
        if (typeof this.props.setShouldSubmit === 'function')
        {
          request.post('/coral/')
          .set('X-CSRFToken', WebSettingProvider.csrfToken)
          .timeout({
            response: 60000,  // Wait 60 seconds for the server to start sending,
          })
          .send({
            'url': self.imgObj.src,
            'x0': 0,
            'x1': 0,
            'y0': 0,
            'y1': 0,
          })
          .then(res => {
            if (res.status >= 200 && res.status < 300)
            {
              console.log('Photo info registered');
              this.FetchFlickrPhoto();
            }
          }, err => {
            console.log(err);
          });
          this.props.setShouldSubmit(true);
        } else {
          console.error('setShouldSubmit function not available');
        }  
      }

      public onSubmit()
      {
        var self = this;
        if (typeof this.props.setShouldSubmit === 'function')
        {
          var rect = this.GetCurrentRectPosition();
          if (!rect)
          {
            return;
          }
          request.post('/coral/')
          .set('X-CSRFToken', WebSettingProvider.csrfToken)
          .timeout({
            response: 60000,  // Wait 60 seconds for the server to start sending,
          })
          .send({
            'url': self.imgObj.src,
            'x0': rect.x0,
            'x1': rect.x1,
            'y0': rect.y0,
            'y1': rect.y1,
          })
          .then(res => {
            console.log(res);
            if (res.status >= 200 && res.status < 300)
            {
              console.log('Photo info registered');
              this.FetchFlickrPhoto();
            }
          }, err => {
            console.log(err);
          });
          this.props.setShouldSubmit(true);
        } else {
          console.error('setShouldSubmit function not available');
        }    
      }

      public render() : JSX.Element {
        const { classes } = this.props;

        return (
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                CoralFinder Sample counts: {this.state.currCount}
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={this.onSubmit}>
                Submit
              </Button>
              <Button 
                variant="contained" 
                color="secondary"
                onClick={this.onInvalid}>
                No Coral
              </Button>
            </Toolbar>
          </AppBar>
        );
      }

      protected CreateHTMLCanvasByName(name: string) {
        const canvasRoot = document.getElementById("canvasWrapper");
        const htmlCanvas = document.createElement("canvas");
        htmlCanvas.id = name;
    
        const imageEle = document.createElement("img");
        imageEle.id = 'coralimg';
        imageEle.hidden = true;

        if (canvasRoot !== null)
        {
          canvasRoot.appendChild(imageEle);
          canvasRoot.appendChild(htmlCanvas);
        } else {
          console.error("canvas root is null!");
        }

        return htmlCanvas;
      }

      private FetchFlickrPhoto(){
        var self = this;

        request.get('/coral/')
        .set('X-CSRFToken', WebSettingProvider.csrfToken)
        .timeout({
          response: 60000,  // Wait 60 seconds for the server to start sending,
        })
        .query({})
        .then(res => {
          if (res.body != null && res.status >= 200 && res.status < 300)
          {
            const url = res.body.url;
            
            self.PopulateCanvasWithUrl(url);
            self.setState({currCount: res.body.count});
          }
        }, err => {
          console.log(err);
        });
      }

      private PreparingImageObj()
      {
        this.imgObj = document.getElementById("coralimg") as HTMLImageElement;

        this.imgObj.crossOrigin = "Anonymous";
        if (this.imgObj)
        {
          this.imgObj.onload = () => {
            var imgInstance = new fabric.Image(this.imgObj, {
              left: 0,
              top: 0,
            });
  
            if (imgInstance.width && imgInstance.height)
            {
              this.canvas.setWidth(imgInstance.width);
              this.canvas.setHeight(imgInstance.height);
              this.canvas.setBackgroundImage(imgInstance, this.canvas.renderAll.bind(this.canvas), {
                  // Needed to position backgroundImage at 0/0
                originX: 'left',
                originY: 'top'
              });
              this.canvas.requestRenderAll();
            };
          }
        }
      }

      private PopulateCanvasWithUrl(url: string)
      {
        if (!this.imgObj)
        {
          this.PreparingImageObj();
        }

        this.imgObj.src = url;
      }

      private GetCurrentRectPosition() : CoralRect | null {
        var rect = this.canvas._objects[0];
        var cwidth = this.canvas.getWidth();
        var cheight = this.canvas.getHeight();
        if (rect && rect.left && rect.top && rect.width && rect.height)
        {
          var cr = new CoralRect();
          cr.x0 = rect.left / cwidth;
          cr.x1 = (rect.left + rect.width) / cwidth;
          cr.y0 = rect.top / cheight;
          cr.y1 = (rect.top + rect.height) / cheight;
          return cr;
        }
        
        return null;
      }

      private ConstructPhotoUrl(farmId: string, serverId: string, id: string, secret: string) : string {
        return `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
      }
    }
)