import React, { Component } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BanIcon from '@material-ui/icons/Gavel';
import { grey } from '@material-ui/core/colors';

import './styles.css';

const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

class BanDialog extends Component {
    state = { reason: '' }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        this.setState({
            reason: value
        });
    }

    render() {
        const {handleClose, handleBan, ban} = this.props;
        const {reason} = this.state;
        return (
            <div className="banDialog">
                <Card className="banDialog__dialog">
                    <h1>{ban ? "Ban" : "Unban"} User</h1>
                    {ban &&
                        <div>
                            <p>Please Enter the reason for Banning</p>
                            <ThemeProvider theme={theme}>
                            <TextField className="banDialog__text-area"
                                label="Reason"
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={this.handleInputChange}/></ThemeProvider>
                        </div>
                    }
                    {!ban && <p>Are you sure you want to unban this user?</p> }
                    <Button className={ban ? "banDialog__ban-button" : "banDialog__unban-button"}
                        variant="outlined"
                        startIcon={<BanIcon/>}
                        onClick={() => handleBan(reason)}>
                        {ban ? "Ban" : "Unban"} 
                    </Button>
                    <Button className="banDialog__button" onClick={handleClose}>Cancel</Button>
                </Card>
            </div>
        );
    }
}

export default BanDialog;