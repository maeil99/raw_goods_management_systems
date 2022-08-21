import Link from 'next/link';

const FourOrFour = () => (
  <div className="flex justify-center py-10">
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center text-nft-black-4">
                  404
                </h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2 text-nft-black-4 ">
                  Look like you are lost
                </h3>

                <p className="text-nft-black-4 ">
                  the page you are looking for not available!
                </p>

                <Link href="/">
                  <div>
                    <p className="link_404 text-nft-black-4 bg-nft-red-violet">Back to Homepage...</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default FourOrFour;
