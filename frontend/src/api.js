import { initializeApp } from "firebase/app";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    collection,
    getFirestore,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    addDoc,
    deleteDoc,
    updateDoc
} from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAF3E9zO7ZVPRdsGpm5E4p9A7ELNRWly4w",
    authDomain: "mobile-hour-40be3.firebaseapp.com",
    projectId: "mobile-hour-40be3",
    storageBucket: "mobile-hour-40be3.appspot.com",
    messagingSenderId: "974970540076",
    appId: "1:974970540076:web:61e3ac282eed982a9d0189",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const usersCollection = collection(db, "users");

// check email address in database to void duplication
export async function checkEmail(email) {
    // create a query against a specific collection
    // query() takes the reference collection as argument
    // where() sets the filter logic
    const q = query(usersCollection, where("email", "==", email));
    const snapshot = await getDocs(q);
    // snapshot.docs is an array of docs.
    // if no doc with the query exists returns true and accept the email
    return snapshot.docs.length === 0;
}

// registration user
export async function createUser(user) {
    try {
        await addDoc(usersCollection, user);
    } catch (error) {
        console.log("Error creating new user: " + error);
    }
}

// login user
export async function loginUser(email, password) {
    try {
        // authenticate the user
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        // store its ID in localStorage
        const user = userCredential.user;
        localStorage.setItem("userID", user.uid);
        // perform successful login
        return user;
    } catch (error) {
        console.log("Error logging user: ", error);
        return null;
    }
}

// logout
export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("Session terminated!");
    } catch (error) {
        console.log("Error logging out: ", error);
    }
}

// Product API calls
export async function getProducts() {
    try {
        const snapshot = await getDocs(productsCollection);
        const products = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
    }
}

export async function getProduct(id) {
    const docRef = doc(db, "products", id);
    const snapshot = await getDoc(docRef);
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getProductByID(productID) {
    try {
        // create a ref for the doc by its ID
        const productRef = doc(db, "products", productID)

        // fetch the doc
        const docSnap = await getDoc(productRef)

        // check if the doc exists
        if (docSnap.exists()) {
            console.log("Document data ", docSnap.data())
            return docSnap.data()
        } else {
            console.log("No doc found")
            return null
        }
    } catch (error) {
        console.error("Error fetching product by ID: ", error)
        throw error
    }
}


export async function createProduct(product) {
    try {
        // reference to the collection
        const productsCollection = collection(db, "product")
        
        // add the new document to the collection
        const docRef = await addDoc(productsCollection, product)

        // return the new doc by its ID
        return docRef.id
    } catch (error) {
        console.log("Error adding document:", error)
        throw error
    }
}

export async function updateProduct(productID, updateData) {
    try {
        // reference to a doc by ID
        const docRef = doc(db, "products", productID)

        // update it
        await updateDoc(docRef, updateData)

        console.log(`Doc with ID ${productID} updated!`)
        return true

    } catch (error) {
        console.log("Error updating document:", error)
        return false
    }
}

export async function deleteProduct(productID) {
    try {
        // reference to a doc by ID
        const docRef = doc(db, "products", productID)

        // delete it
        await deleteDoc(docRef)

        console.log(`Doc with ID ${productID} deleted!`)
        return true
    } catch (error) {
        console.log("Error deleting doc: ", error)
        return false
    }
}