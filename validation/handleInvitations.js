import { isInvitationValid } from "../db/invitations";
import { isTokenReserved } from '../web3/isTokenReserved.js';
import { mintByInvitation } from "../web3/mintByInvitation.js";
async function handleInvitations(invitationId, tokenId, physicalBookIncluded, chosenPrice, provider, reservationsActive) {
    if (invitationId) {
        let validInvitation = await isInvitationValid(invitationId);
        console.log('isInvitationValid', validInvitation);
        if (validInvitation) {
            const tokenReserved = await isTokenReserved(tokenId);
            if (tokenReserved && reservationsActive) {
                return "Token is still reserved. Invitation is not enough!";
            } else {
                mintByInvitation(parseInt(tokenId, 10), invitationId, physicalBookIncluded, chosenPrice, provider);
                return true;
            }
        } else {
            return "Invalid invitation!";
        }
    } else {
        return "Invitations are active, but no invitation is provided.";
    }
}
export { handleInvitations };