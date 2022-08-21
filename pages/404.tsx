import Link from 'next/link';

const FourOrFour = () => (
  <div className="flex justify-center py-10">
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center dark:text-white dark:bg-nft-dark ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2 dark:text-white dark:bg-nft-dark">Look like you are lost</h3>

                <p className="dark:text-white dark:bg-nft-dark">the page you are looking for not available!</p>

                <Link href="/" className="link_404">
                  Back to the homepage...
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
