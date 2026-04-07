import Imghero from "../assets/hero.png";

export default function SignUp() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 bg-linear-to-t from-white via-black/15 to-black-700 rounded-2xl shadow-2xl p-6">
      <div className="p-8 rounded-lg w-full ">
        <h2 className="font-extrabold text-3xl md:text-6xl">Join our culinary inner circle.</h2>
        <p className="text-gray-600 mt-2 mb-6">
          Get exclusive recipes, seasonal guides, and chef interviews delivered straight to your inbox. Sign up now and start cooking with confidence!
        </p>
        <div className="space-y-4 gap-3 w-full flex md:flex-row flex-col">
            <input type="email" placeholder="email@address.com" className="w-full py-3 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            <button type="submit" className="max-w-5xl h-fit cursor-pointer bg-black/90 text-white py-3 px-4 text-nowrap rounded-full hover:bg-black transition-colors duration-200 font-medium">
              Sign Me Up
            </button>
        </div>
        
          <p className="text-gray-500 text-sm mt-4">
            By signing up, you agree to our <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>.
          </p>
       
      </div>
      <div className="bg-gray/10 border-white p-4 pb-12 rounded-[2.5rem] shadow-xl rotate-[-4deg] max-w-sm">
        <img src={Imghero}
         alt="Newsletter Illustration" 
         className="w-64 h-64 object-cover object-center rounded-lg md:block" 
        />
      </div>
    </div>
  );
}