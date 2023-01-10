const { response } = require('express');
const { requestResponse } = require('../sockets/socket');
const { run } = require('./puppeteerController');

 


const requestFilter = async(req, res = response) => {

     const {id, toggle} = req.body;
   //  id--;
 
    // let deptartament;
    // if ( user.role == 'USER_ROLE' ) {
    //     deptartament = await Department.findOne({ user }, '_id name ubication')
    // }

    if(id>2){
        return res.status(202).json({
            status: true,
            msg: 'Não se Pode...'
        })
    }
    console.log(id-1 + '->' + toggle);
    
    run(id-1, toggle).then((result)=>{

        if(result==false){
            console.log('ERROR');            
        }else{
            console.log('SUCCESSFULLY TOGLED ID: ' + id + ' to ' + (toggle ? 'BLOCKED ' : 'UNBLOCKED'));

        }

        requestResponse(result, id-1, !toggle);
    }, id, toggle);

    return res.status(202).json({
        status: true,
        msg: 'Proccesing Request...'
    })

}


const getFilterList = async(req, res = response) => {

    const list = [
        { id: '1', name: 'Camille', isActive: true, image: 'https://scontent.fisj1-1.fna.fbcdn.net/v/t39.30808-6/292077179_413883174116941_2919737376404356745_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFwnYJ6glOczhVlgjPhC3R8lt9OBfp-qbuW304F-n6pux-Koql1ixf963KL4oEwS1xs6lkF3RNMsolpxfWMx2Qh&_nc_ohc=Sm8cATOtZIcAX-JGETe&_nc_ht=scontent.fisj1-1.fna&oh=00_AfAzJN_tTIZbN9Thnr_Vf6L30O2SedEapHjPG8fCUEBJXg&oe=63B7DBB6'},
        { id: '2', name: 'Dulce', isActive: true, image: 'https://scontent.fisj1-1.fna.fbcdn.net/v/t39.30808-6/272974773_984293698863223_4402265799996265691_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFty1dCLHGht8Lyx-msWKMu2ZrlaJtEa0bZmuVom0RrRph_vyLQKCf2aq2KZa-dhRyna6235ZGbmDAZk1dcUI53&_nc_ohc=KVv4XdmWkHEAX9lQOPR&_nc_ht=scontent.fisj1-1.fna&oh=00_AfCInl-8wNh6YLBvuV-LWlmd4RawNNkIG8oteDw4Rz5Ktg&oe=63B83968' },
        { id: '3', name: 'Fercho', isActive: true, image: 'https://scontent.fisj1-1.fna.fbcdn.net/v/t1.6435-9/55764319_1546917058784385_1540422563677601792_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFkC_jjeDpGY5HivadAUKzxcYDmSIkDIjhxgOZIiQMiOLRyWjHvyovTlwUp8x2kuHDiMovljXx4y07SdRoH30lY&_nc_ohc=A8vUL-D1Uk0AX-Ci52N&_nc_ht=scontent.fisj1-1.fna&oh=00_AfBbddxUg_1BlGpM98b1xjxES0NCq5xx0uELo4U6HTuHTg&oe=63DA1EA3' },
        { id: '3', name: 'Karen', isActive: true, image: 'https://scontent.fisj1-1.fna.fbcdn.net/v/t1.18169-9/22154390_1666484096758290_3465575409271185717_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_eui2=AeH4CyyEH1TVrdkuYptOdZom39t6Y6WnZBjf23pjpadkGLpmJbE5jcSPtp0B12jQIccwAP_-1Hy3z_bcoGiPlNfq&_nc_ohc=0jWr7ODKYdwAX9BGGZS&_nc_ht=scontent.fisj1-1.fna&oh=00_AfBQazbpMt5WlMaRsgjEeC7_RT68oxfKLHCusYUNuF_qfQ&oe=63D9F6A7' },
    ]

    const msg = 'ALL GOOD'

    return res.status(200).json({
        list,
        msg
    })
}




module.exports = {
    getFilterList,
    requestFilter
}