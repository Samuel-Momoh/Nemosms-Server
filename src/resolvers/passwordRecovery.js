
import OTP from 'otp-client'

var expires =  function (dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
    }
export default {
 
  Mutation: {
    resetUserPassword: async  (parent, { token, email, password }, { models }) => {
        // const validated = await  models.Reset.findByPk(token)
        // console.log(validated);
        await models.User.update({password: password},{where:{email: email}});
        return true
      },
      passwordRecovery: async  (parent, { email }, { models }) => {
        const user = await models.User.findByLogin(email);
        if(user){
            const expiration = expires(new Date(), 15).toString();
            const options = {
                algorithm: "sha256",
                digits: 8,
                period: 900
              }
            const otp = await  new OTP(email,options);
            // console.log(otp.getTimeUntilNextTick(),otp.getToken())
            
         await models.Reset.create({
             email: email,
             token: otp.getToken(),
             expires:expiration
         })


        }
        return true
      },
  },
};