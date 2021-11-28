import React from "react";

export default function News(props) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
          News
        </h1>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/2 w-full">
            <div className="h-full bg-gray-100 p-8 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
              </svg>

              <img
                className="rounded-xl "
                src="https://images.squarespace-cdn.com/content/v1/5efce5920d28887981c5bd9b/1613667353831-UB84FLKOWQUZFI3BKSXP/Mortal+Kombat+banner.jpeg"
                alt="..."
              />

              <h3 className=" text-2xl leading-relaxed mb-6">
                [MORTAL KOMBAT: THE WINNER WAR] - NAME POPULAR MOVIES
                TRANSFORMED FROM POPULAR GAMES
              </h3>
              <p className="leading-relaxed mb-6 tracking-wide">
                In 2021, the audience will have the opportunity to enjoy the
                brand new movie version of Mortal Kombat (Vietnamese title:
                Mortal Kombat: Mortal Kombat). In the trailer that has just
                broken the record of "most viewed R-rated trailer" of the film,
                we will follow the new character Cole Young (Lewis Tan) to learn
                about the secret Mortal Kombat tournament - where Cole Young and
                the boxers The most elite of the Earth Realm like Luu Khang,
                Cong Lao, Sonya or Jax will join forces to fight the evil
                sorcerer Thuong Tong and his plot to invade Earth. With the Red
                Band 17+ labeling like the original game, the film will not be
                limited by action scenes, unique fatality moves, thereby
                adapting more fully the best features of the original game.
              </p>
              <p className="leading-relaxed font-extralight mb-6">
                MORTAL KOMBAT (Vietnamese title: MORTAL KOMBAT: THE BIRTHDAY
                WAR) – scheduled to premiere on April 9, 2021 nationwide with
                2D, IMAX 2D formats.
              </p>
              <a className="inline-flex items-center">
                {/* <img
                  alt="testimonial"
                  src="https://dummyimage.com/106x106"
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                /> */}
                <div className="text-2xl p-2 mr-2">
                  <i class="far fa-user"></i>
                </div>
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    Holden Caulfield
                  </span>
                  <span className="text-gray-500 text-sm">AUTHOR</span>
                </span>
              </a>
            </div>
          </div>

          <div className="p-4 md:w-1/2 w-full">
            <div className="h-full bg-gray-100 p-8 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
              </svg>

              <img
                className="rounded-xl "
                src="https://cdnmedia.baotintuc.vn/Upload/YZmStSDTjb0M07hFJ2gA/files/2021/09/6/shang-chi-060921.jpg"
                alt="..."
              />

              <h3 className=" text-2xl leading-relaxed mb-6">
                SHANG-CHI AND THE LEGEND OF THE TEN RINGS
              </h3>
              <p className="leading-relaxed mb-6 tracking-wide">
                Shang-Chi and the Legend of the Ten Rings is a movie that was
                announced by Marvel at Comic-con in San Diego and belongs to
                phase 4 of the Marvel Cinematic Universe (MCU). The character
                Shang-Chi, originally created by Steve Englehart and Jim
                Starlin, was first introduced in the early 1970s. This character
                is known as a Kung Fu master, a master of martial arts.
                Shang-Chi's strength comes from thousands of hours of hard work
                and intense self-discipline.
              </p>
              <p className="leading-relaxed font-extralight mb-6">
                Shang-Chi premiered on September 9, starring Luu Tu Mu, released
                exclusively in theaters
              </p>
              <a className="inline-flex items-center">
                <div className="text-2xl p-2 mr-2">
                  <i class="far fa-user"></i>
                </div>
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    Alper Kamu
                  </span>
                  <span className="text-gray-500 text-sm">AUTHOR</span>
                </span>
              </a>
            </div>
          </div>

          <div className="p-4 md:w-1/2 w-full">
            <div className="h-full bg-gray-100 p-8 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
              </svg>

              <img
                className="rounded-xl "
                src="https://static.ssphim.net/static/5fe2d564b3fa6403ffa11d1c/618931af4cadee4d48374a98_Venom-2-3.jpg"
                alt="..."
              />

              <h3 className=" text-2xl leading-relaxed mb-6">
                VENOM 2: LET THERE BE CARNAGE
              </h3>
              <p className="leading-relaxed mb-6 tracking-wide">
                In this part 2, Tom Hardy still plays the main role and Woody
                Harrelson joins. Venom 1 was interesting, now it's even more
                colorful when the little Spider Tom Holland is likely to have a
                flying "cameo". Despite criticisms surrounding violence, Venom 2
                is about to hit theaters and promises to be a hit for the cinema
                this year.
              </p>
              <p className="leading-relaxed font-extralight mb-6">
                This great movie is scheduled to be released on September 24,
                2021.
              </p>
              <a className="inline-flex items-center">
                <div className="text-2xl p-2 mr-2">
                  <i class="far fa-user"></i>
                </div>
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    Atticus Finch
                  </span>
                  <span className="text-gray-500 text-sm">AUTHOR</span>
                </span>
              </a>
            </div>
          </div>

          <div className="p-4 md:w-1/2 w-full">
            <div className="h-full bg-gray-100 p-8 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
              </svg>

              <img
                className="rounded-xl"
                src="https://www.cuopm.com/wp-content/uploads/2021/11/spider-man-no-way-home-marvel-doctor-strange.jpeg"
                alt="..."
              />

              <h3 className=" text-2xl leading-relaxed mb-6">
                SPIDER-MAN: NO WAY HOME
              </h3>
              <p className="leading-relaxed mb-6 tracking-wide">
                Spider-Man: No Way Home will continue the story in the film
                before Peter Parker was known to everyone and Mysterio himself.
                He and his girlfriend face unforeseen dangers, so Spider Man has
                to ask Doctor Strange for help with the aim of making everyone
                forget their identity. Since then, things have started to get
                more complicated, Peter must begin his journey to discover what
                the power and meaning of a superhero is.
              </p>
              <p className="leading-relaxed font-extralight mb-6">
                Spider-Man: No Way Home was slated to release in the US on
                December 17<sup>th</sup>, 2021. Previously, the film was set to
                release on July 16<sup>th</sup>, 2021, but was later pushed back
                to November 5<sup>th</sup> 2021, before it was further moved to
                December 2021, due to the COVID-19.
              </p>
              <a className="inline-flex items-center">
                <div className="text-2xl p-2 mr-2">
                  <i class="far fa-user"></i>
                </div>
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    Henry Letham
                  </span>
                  <span className="text-gray-500 text-sm">AUTHOR</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
