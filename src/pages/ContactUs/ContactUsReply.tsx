import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, useTheme } from '@mui/material'
import React from 'react'

const ContactUsReply:React.FC<{open: boolean, onClose: (open: boolean) => void, replyId: string, setShowReplyModal: React.Dispatch<React.SetStateAction<boolean>>}> = ({open, onClose, replyId, setShowReplyModal}) => {
    const theme = useTheme();
    return (
    <>
      <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            slotProps={{
              paper: {
                sx: {
                  width: {
                    xs: "80%",
                    sm: "60%",
                    md: "400px",
                    lg: "50%"
                  },
                  maxWidth: "90vw",
                  borderRadius: 3,
                  boxShadow: theme.shadows[24],
                  p: 2,
                //   background: `linear-gradient(135deg, ${theme.palette.background.paper} 80%, ${theme.palette.error.light}10%)`,
                },
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, mt: 1, ml: 2 }}>
                <DialogTitle sx={{ flex: 1, p: 0, fontWeight: 700, color: theme.palette.primary.main, fontSize: 20 }}>
                    {"Reply"}
                </DialogTitle>
            </Stack>
            <form>
                <DialogContent sx={{ background: "transparent" }}>
                    <div className='mb-3'>
                        <TextField
                            id="queryMessage"
                            label={"Message"}
                            type={"text"}
                            name="message"
                            value={""}
                            fullWidth
                            
                            autoComplete="message"
                            variant="outlined"
                            aria-readonly
                            disabled
                            multiline
                            rows={3}
                        />
                    </div>
                    <div className='mb-3'>
                        <div className='h-auto relative group'>
                            <TextField
                                id="reply"
                                dir="ltr"
                                label={"Send Reply"}
                                type={"text"}
                                name="reply"
                                onChange={(e: any) => {
                                    // handleChange(e);
                                }
                                }
                                // onBlur={handleBlur}
                                // value={values?.reply}
                                fullWidth
                            
                                variant="outlined"
                                multiline
                                rows={3}

                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "flex-end", gap: 1 }}>
                    <Button
                        onClick={()=>{setShowReplyModal(false)}} 
                        variant="outlined" 
                        color="inherit" 
                        sx={{ borderRadius: 2, fontWeight: 500 }}
                    >
                    {"Cancel"}
                    </Button>
                    <Button
                    //   onClick={onConfirm}
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 2 }}
                    type='submit'
                    >
                    {"Reply"}
                    </Button>
                </DialogActions>
            </form>
          </Dialog>
    </>
  )
}

export default ContactUsReply
